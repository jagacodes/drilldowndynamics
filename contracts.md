# API Contracts - Drilldown Dynamics Website

## Overview
This document outlines the contracts between frontend and backend for the Drilldown Dynamics oil & gas equipment rental website.

## Current Implementation Status

### Frontend (Completed)
- **Pages**: Home, About, Services, Portfolio, Leadership, Contact
- **Design**: Modern dark theme with ocean blue accents, animations, rounded corners
- **Mock Data**: Contact form currently uses frontend-only mock submissions
- **Images**: Professional oil & gas images integrated from Unsplash

### Backend (To Be Implemented)

## API Endpoints Required

### 1. Contact Form Submission
**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "message": "string (required)"
}
```

**Response Success (200)**:
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll get back to you soon.",
  "submission_id": "uuid"
}
```

**Response Error (400)**:
```json
{
  "success": false,
  "error": "Validation error message"
}
```

**Response Error (500)**:
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Database Schema

### ContactSubmission Collection
```python
{
  "id": "uuid (auto-generated)",
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "company": "string (optional)",
  "message": "string",
  "submitted_at": "datetime (auto-generated)",
  "email_sent": "boolean (default: false)",
  "email_sent_at": "datetime (nullable)"
}
```

## Email Integration Requirements

### Email Service Configuration
- **Recipient**: sales@drilldowndynamics.com
- **Subject**: "New Contact Form Submission - Drilldown Dynamics"
- **Email Provider**: To be configured (SMTP or service like SendGrid)

### Email Template
```
New Contact Form Submission

From: {name}
Email: {email}
Phone: {phone or 'Not provided'}
Company: {company or 'Not provided'}

Message:
{message}

---
Submitted at: {timestamp}
Submission ID: {id}
```

## Frontend Integration Changes

### File: `/app/frontend/src/pages/Contact.jsx`

**Current Mock Implementation** (lines ~30-45):
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Mock submission - will be replaced with backend integration
  setTimeout(() => {
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
    setIsSubmitting(false);
  }, 1000);
};
```

**To Be Replaced With**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await axios.post(`${API}/contact`, formData);
    
    if (response.data.success) {
      toast({
        title: 'Message Sent!',
        description: response.data.message,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: error.response?.data?.error || 'Failed to send message. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

## Backend Implementation Checklist

- [ ] Create ContactSubmission Pydantic model
- [ ] Create POST /api/contact endpoint
- [ ] Add email validation
- [ ] Configure SMTP/email service
- [ ] Implement email sending functionality
- [ ] Store submissions in MongoDB
- [ ] Add error handling
- [ ] Test email delivery
- [ ] Update frontend to use real API

## Environment Variables Needed

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com  # or other provider
SMTP_PORT=587
SMTP_USERNAME=your-email@example.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@drilldowndynamics.com
EMAIL_TO=sales@drilldowndynamics.com
```

## Testing Checklist

### Backend Testing
- [ ] Test successful submission
- [ ] Test validation errors (missing required fields)
- [ ] Test invalid email format
- [ ] Test email delivery
- [ ] Test database storage
- [ ] Test error scenarios

### Frontend Testing
- [ ] Test form submission with valid data
- [ ] Test form validation
- [ ] Test error messages display
- [ ] Test success message display
- [ ] Test form reset after submission
- [ ] Test loading state during submission

## Notes
- All form data should be sanitized before storage
- Consider rate limiting to prevent spam
- Add CAPTCHA if spam becomes an issue
- Email should be sent asynchronously to avoid blocking the response
