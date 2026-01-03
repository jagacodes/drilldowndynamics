from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.contact import ContactSubmission, ContactSubmissionCreate
from services.email_service import email_service
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/contact")
async def submit_contact_form(
    submission_data: ContactSubmissionCreate,
    background_tasks: BackgroundTasks
):
    try:
        submission = ContactSubmission(**submission_data.dict())
        submission_dict = submission.dict()
        await db.contact_submissions.insert_one(submission_dict)
        
        logger.info(f"✅ Contact submission stored successfully in MongoDB: {submission.id}")
        logger.info(f"   From: {submission.name} ({submission.email})")
        
        background_tasks.add_task(
            send_email_notification,
            submission_dict
        )
        
        return {
            "success": True,
            "message": "Thank you for contacting us! Your message has been received and stored. We'll get back to you soon.",
            "submission_id": submission.id
        }
        
    except Exception as e:
        logger.error(f"Error processing contact submission: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your submission. Please try again later."
        )

async def send_email_notification(submission_data: dict):
    try:
        email_sent = email_service.send_contact_notification(submission_data)
        
        if email_sent:
            await db.contact_submissions.update_one(
                {"id": submission_data["id"]},
                {
                    "$set": {
                        "email_sent": True,
                        "email_sent_at": datetime.utcnow()
                    }
                }
            )
            logger.info(f"Email sent and database updated for submission {submission_data['id']}")
        
    except Exception as e:
        logger.error(f"Error in background email task: {str(e)}")