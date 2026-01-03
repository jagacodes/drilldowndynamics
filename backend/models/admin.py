from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    submission_id: str
    response_text: str = Field(..., min_length=1, max_length=5000)
    send_email: bool = True

class QueryStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(pending|responded|archived)$")

class ContactSubmissionResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str
    submitted_at: datetime
    email_sent: bool = False
    email_sent_at: Optional[datetime] = None
    status: str = "pending"
    admin_response: Optional[str] = None
    response_sent_at: Optional[datetime] = None
    response_email_sent: bool = False

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }
