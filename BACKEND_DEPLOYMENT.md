# Backend Deployment Guide

## 🚀 Deploying Your Backend to Production

This guide covers deploying your FastAPI backend to various platforms and configuring CORS for your frontend.

---

## Table of Contents
1. [CORS Configuration](#cors-configuration)
2. [Platform-Specific Deployment](#platform-specific-deployment)
3. [Environment Variables](#environment-variables)
4. [MongoDB Setup](#mongodb-setup)
5. [Testing Deployment](#testing-deployment)

---

## CORS Configuration

### Understanding CORS

CORS (Cross-Origin Resource Sharing) allows your frontend (hosted on one domain) to communicate with your backend (hosted on another domain).

### Current Configuration

Your backend is configured to read allowed origins from the `.env` file:

```python
# In server.py
allowed_origins = os.environ.get('ALLOWED_ORIGINS', '*')
```

### Setting CORS for Production

#### Option 1: Single Frontend Domain

Edit `/app/backend/.env`:
```env
ALLOWED_ORIGINS=https://yourfrontend.com
```

#### Option 2: Multiple Domains (Main + www)

```env
ALLOWED_ORIGINS=https://drilldowndynamics.com,https://www.drilldowndynamics.com
```

#### Option 3: Development + Production

```env
ALLOWED_ORIGINS=http://localhost:3000,https://drilldowndynamics.com
```

**⚠️ Security Warning:**
- Never use `ALLOWED_ORIGINS=*` in production!
- Only specify domains you control
- Always use HTTPS in production

---

## Platform-Specific Deployment

### 1. Railway (Recommended for FastAPI)

**Why Railway?**
- ✅ Free tier available
- ✅ Built-in MongoDB support
- ✅ Easy deployment from GitHub
- ✅ Automatic HTTPS

**Deployment Steps:**

1. **Create Railway Account:** https://railway.app

2. **Create New Project:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize
   cd /app/backend
   railway init
   ```

3. **Add MongoDB:**
   - In Railway dashboard, click "New"
   - Select "Database" → "MongoDB"
   - Copy connection string

4. **Configure Environment Variables:**
   ```
   MONGO_URL=mongodb://mongo:password@containers-us-west-xxx.railway.app:6379
   DB_NAME=drilldown_dynamics
   ALLOWED_ORIGINS=https://your-frontend.netlify.app
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_FROM=noreply@drilldowndynamics.com
   EMAIL_TO=sales@drilldowndynamics.com
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get Your Backend URL:**
   - Railway will provide: `https://your-app.up.railway.app`
   - Update frontend `.env` with this URL

---

### 2. Render (Alternative)

**Why Render?**
- ✅ Free tier available
- ✅ Easy setup
- ✅ Good documentation

**Deployment Steps:**

1. **Create Account:** https://render.com

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use Docker deployment

3. **Configure Build:**
   ```
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

4. **Add Environment Variables:**
   ```
   MONGO_URL=your-mongodb-connection-string
   DB_NAME=drilldown_dynamics
   ALLOWED_ORIGINS=https://your-frontend.com
   ```

5. **Deploy and Get URL:**
   - Render provides: `https://your-app.onrender.com`

---

### 3. Heroku

**Deployment Steps:**

1. **Create Heroku Account:** https://heroku.com

2. **Install Heroku CLI:**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Ubuntu
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Create App:**
   ```bash
   cd /app/backend
   heroku login
   heroku create drilldown-dynamics-api
   ```

4. **Add MongoDB:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables:**
   ```bash
   heroku config:set ALLOWED_ORIGINS=https://your-frontend.com
   heroku config:set DB_NAME=drilldown_dynamics
   ```

6. **Create Procfile:**
   ```bash
   echo "web: uvicorn server:app --host 0.0.0.0 --port \$PORT" > Procfile
   ```

7. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

---

### 4. DigitalOcean App Platform

**Deployment Steps:**

1. **Create Account:** https://www.digitalocean.com

2. **Create App:**
   - Click "Create" → "Apps"
   - Connect GitHub repository
   - Select backend folder

3. **Configure:**
   ```
   Run Command: uvicorn server:app --host 0.0.0.0 --port 8080
   HTTP Port: 8080
   ```

4. **Add MongoDB:**
   - Create managed MongoDB database
   - Or use MongoDB Atlas

5. **Environment Variables:**
   ```
   MONGO_URL=your-connection-string
   DB_NAME=drilldown_dynamics
   ALLOWED_ORIGINS=https://your-frontend.com
   ```

---

### 5. AWS (Advanced)

For production-scale deployments using AWS:

1. **AWS Elastic Beanstalk:**
   ```bash
   eb init -p python-3.11 drilldown-backend
   eb create drilldown-production
   eb setenv ALLOWED_ORIGINS=https://your-frontend.com
   ```

2. **AWS Lambda + API Gateway:**
   - Use Mangum adapter for FastAPI
   - Deploy as serverless function

---

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Recommended)

**Free Tier:** 512MB storage, shared cluster

1. **Create Account:** https://www.mongodb.com/cloud/atlas

2. **Create Cluster:**
   - Choose free tier
   - Select region closest to your backend
   - Create cluster (takes 5-10 minutes)

3. **Create Database User:**
   - Security → Database Access
   - Add new user with password
   - Note: username and password

4. **Whitelist IPs:**
   - Security → Network Access
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - Or add your backend server IP

5. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/drilldown_dynamics?retryWrites=true&w=majority
   ```

6. **Update .env:**
   ```env
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=drilldown_dynamics
   ```

### Option 2: Railway MongoDB

- Automatically provisioned with Railway deployment
- $5/month after free tier

### Option 3: DigitalOcean Managed MongoDB

- Production-ready
- Starting at $15/month

---

## Environment Variables Configuration

### Required Variables

```env
# MongoDB Connection
MONGO_URL=your-mongodb-connection-string
DB_NAME=drilldown_dynamics

# CORS Configuration
ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@drilldowndynamics.com
EMAIL_TO=sales@drilldowndynamics.com
```

### Setting Variables by Platform

**Railway:**
```bash
railway variables set ALLOWED_ORIGINS=https://your-frontend.com
```

**Heroku:**
```bash
heroku config:set ALLOWED_ORIGINS=https://your-frontend.com
```

**Render:**
- Use web dashboard → Environment tab

**DigitalOcean:**
- Use web dashboard → Settings → App-Level Environment Variables

---

## Frontend Configuration

After deploying backend, update frontend `.env`:

```env
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

Replace with your actual backend URL from:
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`
- Heroku: `https://your-app.herokuapp.com`

Then rebuild frontend:
```bash
cd /app/frontend
yarn build
```

---

## Testing Your Deployment

### Test 1: Check Backend is Running

```bash
curl https://your-backend-url.com/api/
```

Expected response:
```json
{"message":"Drilldown Dynamics API is running"}
```

### Test 2: Test CORS

From browser console on your frontend:
```javascript
fetch('https://your-backend-url.com/api/')
  .then(r => r.json())
  .then(data => console.log(data))
```

Should work without CORS errors.

### Test 3: Test Contact Form

```bash
curl -X POST https://your-backend-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "submission_id": "..."
}
```

---

## Common Issues & Solutions

### Issue 1: CORS Error

**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
1. Check `ALLOWED_ORIGINS` in backend `.env`
2. Ensure it matches your frontend URL exactly
3. Include protocol (`https://`)
4. Don't include trailing slash

### Issue 2: MongoDB Connection Failed

**Error:** `MongoServerError: Authentication failed`

**Solution:**
1. Check MongoDB username and password
2. Verify IP whitelist in MongoDB Atlas
3. Ensure connection string is correct

### Issue 3: Environment Variables Not Loading

**Solution:**
1. Verify `.env` file exists in backend directory
2. Check variable names are correct (no typos)
3. Restart backend after changing `.env`

### Issue 4: Backend Not Receiving Requests

**Solution:**
1. Check backend URL in frontend `.env`
2. Ensure backend is running
3. Check firewall/security group settings

---

## Production Checklist

Before going live:

- [ ] Set specific domains in `ALLOWED_ORIGINS` (not `*`)
- [ ] Use HTTPS for both frontend and backend
- [ ] Configure MongoDB with authentication
- [ ] Set up email SMTP credentials
- [ ] Test contact form end-to-end
- [ ] Enable error monitoring (Sentry, etc.)
- [ ] Set up backup for MongoDB
- [ ] Configure rate limiting (optional)
- [ ] Add API documentation (optional)

---

## Quick Deploy Example

**Complete deployment flow:**

1. **Backend (Railway):**
   ```bash
   cd /app/backend
   railway init
   railway up
   # Note the URL: https://your-app.up.railway.app
   ```

2. **Set Environment Variables:**
   ```bash
   railway variables set ALLOWED_ORIGINS=https://your-frontend.netlify.app
   railway variables set MONGO_URL=mongodb+srv://...
   ```

3. **Frontend (Netlify):**
   ```bash
   cd /app/frontend
   echo "REACT_APP_BACKEND_URL=https://your-app.up.railway.app" > .env
   yarn build
   netlify deploy --prod --dir=build
   ```

4. **Update Backend CORS:**
   ```bash
   # Get your Netlify URL
   railway variables set ALLOWED_ORIGINS=https://your-site.netlify.app
   ```

Done! Your full-stack app is live.

---

## Support

For deployment issues:
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **FastAPI:** https://fastapi.tiangolo.com/deployment

---

**Status:** Production deployment guide complete
**Last Updated:** January 2026
