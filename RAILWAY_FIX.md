# Railway Deployment Fix Guide

## Issue Fixed ✅

**Problem:** `ImportError: cannot import name '_QUERY_OPTIONS' from 'pymongo.cursor'`

**Root Cause:** Version incompatibility between `motor` and `pymongo` packages

**Solution:** Updated requirements.txt with compatible versions

---

## What Was Fixed

### 1. Updated requirements.txt

**Old:**
```
motor==3.3.1
```

**New:**
```
pymongo==4.6.1
motor==3.3.2
```

### 2. Added Railway Configuration Files

- `runtime.txt` - Specifies Python 3.11
- `Procfile` - Start command for Railway
- `railway.json` - Railway build configuration
- `nixpacks.toml` - Nixpacks build configuration

---

## Re-Deploy to Railway

### Option 1: Push to GitHub (Recommended)

If you have GitHub connected to Railway:

```bash
cd /app/backend
git add .
git commit -m "Fix motor/pymongo compatibility for Railway"
git push
```

Railway will automatically detect the changes and redeploy.

### Option 2: Railway CLI

```bash
cd /app/backend
railway up
```

### Option 3: Manual Redeploy

1. Go to Railway dashboard
2. Click on your service
3. Click "Redeploy" button
4. Railway will rebuild with new configuration

---

## Environment Variables to Set in Railway

Make sure these are set in Railway dashboard:

### Required Variables:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=drilldown_dynamics
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Optional (Email):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@drilldowndynamics.com
EMAIL_TO=sales@drilldowndynamics.com
```

### How to Set Variables in Railway:

1. Go to your Railway project
2. Click on your backend service
3. Go to "Variables" tab
4. Click "New Variable"
5. Add each variable name and value
6. Railway will automatically redeploy

---

## MongoDB Setup for Railway

### Option 1: Railway MongoDB Plugin (Recommended)

1. In Railway dashboard, click "New"
2. Select "Database" → "Add MongoDB"
3. Railway creates database and sets `MONGO_URL` automatically
4. Add `DB_NAME=drilldown_dynamics` manually

### Option 2: MongoDB Atlas (Free Tier)

1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Add to Railway as `MONGO_URL` variable
4. Add `DB_NAME=drilldown_dynamics`

**MongoDB Atlas Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

**Important:** 
- Replace `username` and `password` with your actual credentials
- In MongoDB Atlas, whitelist IP: `0.0.0.0/0` (allow from anywhere)

---

## Verification Steps

### Step 1: Check Railway Logs

In Railway dashboard:
1. Click on your service
2. Go to "Deployments" tab
3. Click on latest deployment
4. Check build logs for errors

Look for:
```
✓ Build completed successfully
✓ Starting application
INFO:     Application startup complete.
```

### Step 2: Test API Endpoint

```bash
curl https://your-app.up.railway.app/api/
```

Expected response:
```json
{"message":"Drilldown Dynamics API is running"}
```

### Step 3: Test Contact Form

```bash
curl -X POST https://your-app.up.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message from Railway"
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

### Step 4: Check CORS

From browser console on your frontend:
```javascript
fetch('https://your-app.up.railway.app/api/')
  .then(r => r.json())
  .then(console.log)
```

Should work without CORS errors.

---

## Common Railway Deployment Issues

### Issue 1: Build Fails - Python Version

**Error:** `Python version not supported`

**Fix:** Make sure `runtime.txt` exists with:
```
python-3.11.8
```

### Issue 2: Module Not Found

**Error:** `ModuleNotFoundError: No module named 'xyz'`

**Fix:** Add missing package to `requirements.txt`:
```
pip freeze | grep xyz
```

### Issue 3: Port Not Binding

**Error:** `Port already in use` or connection timeout

**Fix:** Make sure your start command uses Railway's PORT:
```bash
uvicorn server:app --host 0.0.0.0 --port $PORT
```

### Issue 4: MongoDB Connection Failed

**Error:** `ServerSelectionTimeoutError`

**Fix:** 
1. Check `MONGO_URL` is correct
2. If using MongoDB Atlas, whitelist `0.0.0.0/0`
3. Verify username and password are correct

### Issue 5: Environment Variables Not Loading

**Error:** `KeyError: 'MONGO_URL'`

**Fix:** 
1. Go to Railway dashboard
2. Variables tab
3. Add missing variables
4. Railway will auto-redeploy

---

## Railway.json Configuration Explained

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pip install -r requirements.txt"
  },
  "deploy": {
    "startCommand": "uvicorn server:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

- **builder**: Uses Nixpacks (Railway's default)
- **buildCommand**: Installs Python dependencies
- **startCommand**: Starts FastAPI with uvicorn
- **restartPolicy**: Restarts on failure (up to 10 times)

---

## Complete Deployment Checklist

Before deploying:

- [x] Updated `requirements.txt` with compatible versions
- [x] Created `runtime.txt` with Python version
- [x] Created `Procfile` with start command
- [x] Created `railway.json` with build config
- [x] Created `nixpacks.toml` for Nixpacks

In Railway dashboard:

- [ ] Set `MONGO_URL` environment variable
- [ ] Set `DB_NAME=drilldown_dynamics`
- [ ] Set `ALLOWED_ORIGINS` with your frontend URL
- [ ] (Optional) Set email configuration variables
- [ ] Deploy/Redeploy service
- [ ] Check deployment logs for success
- [ ] Test API endpoint
- [ ] Test contact form submission

---

## Getting Your Railway URL

After successful deployment:

1. Go to Railway dashboard
2. Click on your service
3. Go to "Settings" tab
4. Find "Domains" section
5. Railway provides: `https://your-app.up.railway.app`

Copy this URL and use it in your frontend `.env`:
```env
REACT_APP_BACKEND_URL=https://your-app.up.railway.app
```

---

## Monitoring Your Deployment

### View Logs in Real-Time:

In Railway dashboard:
1. Click on your service
2. Click "Logs" tab
3. See real-time application logs

### Check Metrics:

1. Click on your service
2. Go to "Metrics" tab
3. View CPU, memory, and network usage

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **FastAPI Deployment:** https://fastapi.tiangolo.com/deployment
- **Motor Docs:** https://motor.readthedocs.io

---

## Next Steps After Successful Deployment

1. **Update Frontend:**
   ```bash
   cd /app/frontend
   echo "REACT_APP_BACKEND_URL=https://your-app.up.railway.app" > .env.production
   yarn build
   ```

2. **Deploy Frontend to Netlify:**
   ```bash
   netlify deploy --prod --dir=build
   ```

3. **Update CORS in Railway:**
   - Add your Netlify URL to `ALLOWED_ORIGINS`
   - Example: `https://your-site.netlify.app`

4. **Test End-to-End:**
   - Visit your frontend
   - Submit contact form
   - Verify submission in MongoDB
   - Check email notification

---

**Status:** Railway deployment issues resolved ✅
**Updated:** January 2026

For additional help, see `/app/BACKEND_DEPLOYMENT.md`
