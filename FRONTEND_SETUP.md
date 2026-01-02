# Drilldown Dynamics - Frontend Website

## Overview
This is a modern, static frontend website for Drilldown Dynamics built with React. No backend required!

## Current Setup - Contact Form

### Method 1: Mailto (Currently Active)
The contact form uses a `mailto:` link that opens the user's default email client.

**Pros:**
- ✅ No backend needed
- ✅ No external services required
- ✅ Works offline

**Cons:**
- ⚠️ Requires user to have email client configured
- ⚠️ User sees the email before sending
- ⚠️ Not mobile-friendly

---

## Better Alternative Options

### Method 2: Formspree (Recommended)

**Why Formspree?**
- ✅ 50 submissions/month free
- ✅ No backend needed
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Easy setup (5 minutes)

**Setup Instructions:**

1. **Sign up at https://formspree.io**

2. **Get your form endpoint:**
   - Click "New Form"
   - Enter form name: "Contact Form"
   - Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)

3. **Update `/app/frontend/src/pages/Contact.jsx`:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        _replyto: formData.email,
        _subject: `Contact Form - ${formData.name}`,
      }),
    });

    if (response.ok) {
      toast.success('Message Sent!', {
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to send message. Please try again.',
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

4. **Configure Formspree:**
   - Set email to: `sales@drilldowndynamics.com`
   - Enable spam protection
   - Customize email template (optional)

---

### Method 3: Web3Forms

**Why Web3Forms?**
- ✅ Unlimited submissions (free)
- ✅ No signup required
- ✅ Spam protection with reCAPTCHA
- ✅ File uploads supported

**Setup Instructions:**

1. **Get your access key at https://web3forms.com**

2. **Update `/app/frontend/src/pages/Contact.jsx`:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formDataToSend = new FormData();
  formDataToSend.append('access_key', 'YOUR_ACCESS_KEY_HERE');
  formDataToSend.append('name', formData.name);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('company', formData.company);
  formDataToSend.append('message', formData.message);
  formDataToSend.append('from_name', 'Drilldown Dynamics Contact Form');
  formDataToSend.append('to_email', 'sales@drilldowndynamics.com');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend,
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Message Sent!', {
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to send message. Please try again.',
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### Method 4: EmailJS

**Why EmailJS?**
- ✅ 200 emails/month free
- ✅ Custom email templates
- ✅ Multiple recipients
- ✅ Auto-reply feature

**Setup Instructions:**

1. **Install EmailJS:**
```bash
cd /app/frontend
yarn add @emailjs/browser
```

2. **Sign up at https://www.emailjs.com**

3. **Setup:**
   - Create email service (Gmail, Outlook, etc.)
   - Create email template
   - Get your credentials: Service ID, Template ID, Public Key

4. **Update `/app/frontend/src/pages/Contact.jsx`:**

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        to_email: 'sales@drilldowndynamics.com',
      },
      'YOUR_PUBLIC_KEY'
    );

    toast.success('Message Sent!', {
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
  } catch (error) {
    toast.error('Error', {
      description: 'Failed to send message. Please try again.',
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Comparison Table

| Feature | Mailto | Formspree | Web3Forms | EmailJS |
|---------|--------|-----------|-----------|---------|
| Free Tier | Unlimited | 50/month | Unlimited | 200/month |
| Setup Time | 0 min | 5 min | 5 min | 10 min |
| User Experience | Poor | Excellent | Excellent | Excellent |
| Spam Protection | No | Yes | Yes | Limited |
| Custom Templates | No | Yes | No | Yes |
| Mobile Friendly | No | Yes | Yes | Yes |
| **Recommended** | ❌ | ✅ | ✅ | ⚠️ |

---

## Deployment

### Option 1: Netlify (Recommended)

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the frontend:**
```bash
cd /app/frontend
yarn build
```

3. **Deploy:**
```bash
netlify deploy --dir=build --prod
```

4. **Configure:**
   - Custom domain: Add your domain in Netlify settings
   - SSL: Automatically enabled
   - Forms: Netlify Forms available (100 submissions/month free)

### Option 2: Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd /app/frontend
vercel --prod
```

### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
cd /app/frontend
yarn add --dev gh-pages
```

2. **Update `package.json`:**
```json
{
  "homepage": "https://yourusername.github.io/drilldown-dynamics",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy:**
```bash
yarn deploy
```

---

## Environment Variables

The frontend no longer needs backend URL. Remove from `.env`:
```bash
# Remove this line:
# REACT_APP_BACKEND_URL=...
```

---

## Testing Contact Form

1. **Test mailto version (current):**
   - Fill out the form
   - Click "Send Message"
   - Your email client should open
   - Verify all fields are populated

2. **After switching to Formspree/Web3Forms:**
   - Fill out the form
   - Click "Send Message"
   - Check `sales@drilldowndynamics.com` inbox
   - Verify email received with all details

---

## Recommended Next Steps

1. ✅ Choose one of the email service options (Formspree recommended)
2. ✅ Update Contact.jsx with chosen service
3. ✅ Test thoroughly
4. ✅ Deploy to production (Netlify recommended)
5. ✅ Configure custom domain
6. ✅ Enable SSL (automatic on Netlify/Vercel)

---

## Support

If you need help setting up any of these services:
- **Formspree:** https://help.formspree.io
- **Web3Forms:** https://docs.web3forms.com
- **EmailJS:** https://www.emailjs.com/docs

---

## Current Status

✅ Frontend complete with all pages
✅ Contact form using mailto (basic)
⚠️ **Recommended:** Upgrade to Formspree or Web3Forms for better UX
✅ Ready for deployment
