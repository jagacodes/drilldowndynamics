import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 587))
        self.smtp_username = os.environ.get('SMTP_USERNAME', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.email_from = os.environ.get('EMAIL_FROM', 'noreply@drilldowndynamics.com')
        self.email_to = os.environ.get('EMAIL_TO', 'sales@drilldowndynamics.com')

    def send_contact_notification(self, submission_data: dict) -> bool:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'New Contact Form Submission - Drilldown Dynamics'
            msg['From'] = self.email_from
            msg['To'] = self.email_to

            html_body = self._create_email_html(submission_data)
            text_body = self._create_email_text(submission_data)

            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            msg.attach(part1)
            msg.attach(part2)

            if self.smtp_username and self.smtp_password:
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
                logger.info(f"Contact form email sent successfully for submission {submission_data.get('id')}")
                return True
            else:
                logger.warning("SMTP credentials not configured. Email not sent.")
                logger.info(f"[DEV MODE] Email content:\n{text_body}")
                return False

        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False

    def _create_email_html(self, data: dict) -> str:
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
                .field {{ margin-bottom: 20px; }}
                .label {{ font-weight: bold; color: #0EA5E9; margin-bottom: 5px; }}
                .value {{ background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #0EA5E9; }}
                .footer {{ text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔔 New Contact Form Submission</h1>
                    <p>Drilldown Dynamics</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">{data.get('name', 'N/A')}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value">{data.get('email', 'N/A')}</div>
                    </div>
                    <div class="field">
                        <div class="label">Phone:</div>
                        <div class="value">{data.get('phone') or 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="label">Company:</div>
                        <div class="value">{data.get('company') or 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="label">Message:</div>
                        <div class="value">{data.get('message', 'N/A')}</div>
                    </div>
                    <div class="footer">
                        <p>Submitted at: {data.get('submitted_at', datetime.utcnow()).strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
                        <p>Submission ID: {data.get('id', 'N/A')}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

    def _create_email_text(self, data: dict) -> str:
        return f"""
New Contact Form Submission - Drilldown Dynamics

From: {data.get('name', 'N/A')}
Email: {data.get('email', 'N/A')}
Phone: {data.get('phone') or 'Not provided'}
Company: {data.get('company') or 'Not provided'}

Message:
{data.get('message', 'N/A')}

---
Submitted at: {data.get('submitted_at', datetime.utcnow()).strftime('%Y-%m-%d %H:%M:%S UTC')}
Submission ID: {data.get('id', 'N/A')}
        """

    def send_response_email(self, to_email: str, customer_name: str, original_message: str, response_text: str) -> bool:
        """Send a response email to the customer"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Re: Your Inquiry - Drilldown Dynamics'
            msg['From'] = self.email_from
            msg['To'] = to_email

            html_body = self._create_response_html(customer_name, original_message, response_text)
            text_body = self._create_response_text(customer_name, original_message, response_text)

            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            msg.attach(part1)
            msg.attach(part2)

            if self.smtp_username and self.smtp_password:
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
                logger.info(f"Response email sent successfully to {to_email}")
                return True
            else:
                logger.warning("SMTP credentials not configured. Response email not sent.")
                logger.info(f"[DEV MODE] Response email content:\n{text_body}")
                return False

        except Exception as e:
            logger.error(f"Failed to send response email: {str(e)}")
            return False

    def _create_response_html(self, customer_name: str, original_message: str, response_text: str) -> str:
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
                .greeting {{ font-size: 18px; margin-bottom: 20px; }}
                .response {{ background: white; padding: 20px; border-radius: 5px; border-left: 3px solid #0EA5E9; margin-bottom: 20px; }}
                .original {{ background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 14px; color: #666; }}
                .original-label {{ font-weight: bold; color: #333; margin-bottom: 10px; }}
                .footer {{ text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px; }}
                .signature {{ margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Drilldown Dynamics</h1>
                    <p>Powering Energy Solutions</p>
                </div>
                <div class="content">
                    <p class="greeting">Dear {customer_name},</p>
                    <p>Thank you for reaching out to us. Here is our response to your inquiry:</p>
                    <div class="response">
                        {response_text.replace(chr(10), '<br>')}
                    </div>
                    <div class="original">
                        <p class="original-label">Your original message:</p>
                        <p>{original_message}</p>
                    </div>
                    <div class="signature">
                        <p>Best regards,<br><strong>Drilldown Dynamics Team</strong></p>
                        <p>📧 sales@drilldowndynamics.com<br>📞 +234 806 643 4176</p>
                    </div>
                </div>
                <div class="footer">
                    <p>© 2025 Drilldown Dynamics. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """

    def _create_response_text(self, customer_name: str, original_message: str, response_text: str) -> str:
        return f"""
Dear {customer_name},

Thank you for reaching out to us. Here is our response to your inquiry:

{response_text}

---
Your original message:
{original_message}

---
Best regards,
Drilldown Dynamics Team
sales@drilldowndynamics.com
+234 806 643 4176

© 2025 Drilldown Dynamics. All rights reserved.
        """

email_service = EmailService()