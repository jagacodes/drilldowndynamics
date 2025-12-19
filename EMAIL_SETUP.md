# Email Configuration Guide - Drilldown Dynamics

## Current Status
✅ Contact form is **fully functional** and storing submissions in MongoDB  
⚠️ Email notifications are in **DEV MODE** (logging to console)

## To Enable Email Notifications

### Step 1: Choose Email Provider

#### Option A: Gmail (Recommended for Testing)
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Generate password
   - Copy the 16-character password

#### Option B: SendGrid (Recommended for Production)
1. Sign up at https://sendgrid.com
2. Create an API key
3. Use these settings:
   - SMTP Host: smtp.sendgrid.net
   - SMTP Port: 587
   - Username: apikey
   - Password: Your SendGrid API key

#### Option C: Other SMTP Providers
- **Mailgun**: smtp.mailgun.org (Port 587)
- **Amazon SES**: email-smtp.region.amazonaws.com (Port 587)
- **Outlook**: smtp-mail.outlook.com (Port 587)

### Step 2: Update Backend .env File

Add these variables to `/app/backend/.env`:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password-here
EMAIL_FROM=noreply@drilldowndynamics.com
EMAIL_TO=sales@drilldowndynamics.com
```

**Important Notes:**
- Replace `your-email@gmail.com` with your actual email
- Replace `your-app-password-here` with your generated app password
- **DO NOT** use your regular Gmail password
- Keep EMAIL_TO as `sales@drilldowndynamics.com` (or change to desired recipient)

### Step 3: Restart Backend

```bash
sudo supervisorctl restart backend
```

### Step 4: Test Email Delivery

1. Go to the Contact page: http://your-domain/contact
2. Fill out and submit the form
3. Check the recipient email (sales@drilldowndynamics.com)
4. Email should arrive within 1-2 minutes

## Email Template

The system sends HTML emails with this information:
- Contact Name
- Email Address
- Phone Number (if provided)
- Company Name (if provided)
- Message Content
- Timestamp
- Unique Submission ID

## Troubleshooting

### Email Not Sending

1. **Check Backend Logs:**
   ```bash
   tail -f /var/log/supervisor/backend.err.log
   ```

2. **Common Issues:**
   - ❌ Wrong SMTP credentials → Check username/password
   - ❌ Port blocked → Try port 465 (SSL) instead of 587
   - ❌ Gmail blocking → Enable "Less secure app access" or use App Password
   - ❌ Rate limiting → SendGrid/other services may have daily limits

3. **Verify SMTP Connection:**
   ```bash
   curl telnet://smtp.gmail.com:587
   ```

### Email Goes to Spam

- Add SPF and DKIM records to your domain
- Use a professional email service (SendGrid, Mailgun)
- Ensure EMAIL_FROM matches your domain
- Request recipient to whitelist your sender email

## Security Best Practices

1. **Never commit .env file to git**
   - Already in .gitignore
   - Store credentials securely

2. **Use App Passwords** (not regular passwords)
   - Especially for Gmail
   - Create unique passwords for each application

3. **For Production:**
   - Use a dedicated email service (SendGrid, Mailgun, SES)
   - Set up proper SPF, DKIM, and DMARC records
   - Monitor email delivery rates
   - Implement rate limiting

## Production Recommendations

### 1. Use SendGrid (Recommended)
- ✅ 100 emails/day free tier
- ✅ Better deliverability
- ✅ Analytics and tracking
- ✅ Easy setup

### 2. Add Rate Limiting
Consider implementing rate limiting to prevent spam:
```python
# In backend, add rate limiting middleware
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@limiter.limit("5/hour")  # 5 submissions per hour per IP
@router.post("/contact")
async def submit_contact_form(...):
    ...
```

### 3. Add CAPTCHA (Optional)
For high-traffic sites, consider adding reCAPTCHA to prevent bots:
- Google reCAPTCHA v3
- hCaptcha
- Cloudflare Turnstile

## Current Database Storage

All contact submissions are stored in MongoDB regardless of email status:
- Collection: `contact_submissions`
- Fields: name, email, phone, company, message, submitted_at, email_sent, email_sent_at

To view submissions:
```bash
mongosh $MONGO_URL
use emergent_db
db.contact_submissions.find().pretty()
```

## Support

If you need help with email configuration:
1. Check logs first: `tail -f /var/log/supervisor/backend.err.log`
2. Verify SMTP credentials are correct
3. Test with a simple email first
4. Consider using SendGrid for easier setup

---

**Status**: Backend is fully functional. Add SMTP credentials to enable email notifications.
