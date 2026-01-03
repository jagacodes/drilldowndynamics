from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from models.admin import AdminLogin, AdminResponse, QueryStatusUpdate, ContactSubmissionResponse
from services.email_service import email_service
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from datetime import datetime
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter()
security = HTTPBasic()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Admin credentials from environment or defaults
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'drilldown2025')

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    """Verify admin credentials"""
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@router.post("/login")
async def admin_login(login_data: AdminLogin):
    """Verify admin login credentials"""
    if login_data.username == ADMIN_USERNAME and login_data.password == ADMIN_PASSWORD:
        return {
            "success": True,
            "message": "Login successful",
            "username": login_data.username
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/submissions", response_model=List[ContactSubmissionResponse])
async def get_all_submissions(admin: str = Depends(verify_admin)):
    """Get all contact form submissions"""
    try:
        submissions = await db.contact_submissions.find(
            {}, {"_id": 0}
        ).sort("submitted_at", -1).to_list(1000)
        
        # Ensure all submissions have required fields
        for sub in submissions:
            if 'status' not in sub:
                sub['status'] = 'pending'
            if 'admin_response' not in sub:
                sub['admin_response'] = None
            if 'response_sent_at' not in sub:
                sub['response_sent_at'] = None
            if 'response_email_sent' not in sub:
                sub['response_email_sent'] = False
        
        return submissions
    except Exception as e:
        logger.error(f"Error fetching submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")

@router.get("/submissions/{submission_id}")
async def get_submission(submission_id: str, admin: str = Depends(verify_admin)):
    """Get a single submission by ID"""
    try:
        submission = await db.contact_submissions.find_one(
            {"id": submission_id}, {"_id": 0}
        )
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
        return submission
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submission")

@router.patch("/submissions/{submission_id}/status")
async def update_submission_status(
    submission_id: str,
    status_update: QueryStatusUpdate,
    admin: str = Depends(verify_admin)
):
    """Update the status of a submission"""
    try:
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status_update.status}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        return {"success": True, "message": f"Status updated to {status_update.status}"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update status")

@router.post("/submissions/{submission_id}/respond")
async def respond_to_submission(
    submission_id: str,
    response_data: AdminResponse,
    admin: str = Depends(verify_admin)
):
    """Respond to a contact submission"""
    try:
        # Get the original submission
        submission = await db.contact_submissions.find_one(
            {"id": submission_id}, {"_id": 0}
        )
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        # Prepare update data
        update_data = {
            "admin_response": response_data.response_text,
            "response_sent_at": datetime.utcnow(),
            "status": "responded"
        }
        
        email_sent = False
        
        # Try to send email if requested
        if response_data.send_email:
            email_sent = email_service.send_response_email(
                to_email=submission['email'],
                customer_name=submission['name'],
                original_message=submission['message'],
                response_text=response_data.response_text
            )
            update_data["response_email_sent"] = email_sent
        
        # Update the database
        await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": update_data}
        )
        
        if response_data.send_email:
            if email_sent:
                return {
                    "success": True,
                    "message": "Response saved and email sent to customer",
                    "email_sent": True
                }
            else:
                return {
                    "success": True,
                    "message": "Response saved but email could not be sent (SMTP not configured)",
                    "email_sent": False
                }
        else:
            return {
                "success": True,
                "message": "Response saved successfully",
                "email_sent": False
            }
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error responding to submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save response")

@router.delete("/submissions/{submission_id}")
async def delete_submission(submission_id: str, admin: str = Depends(verify_admin)):
    """Delete a submission"""
    try:
        result = await db.contact_submissions.delete_one({"id": submission_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        return {"success": True, "message": "Submission deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete submission")

@router.get("/stats")
async def get_stats(admin: str = Depends(verify_admin)):
    """Get dashboard statistics"""
    try:
        total = await db.contact_submissions.count_documents({})
        pending = await db.contact_submissions.count_documents({"status": {"$ne": "responded"}})
        responded = await db.contact_submissions.count_documents({"status": "responded"})
        
        return {
            "total": total,
            "pending": pending,
            "responded": responded
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")
