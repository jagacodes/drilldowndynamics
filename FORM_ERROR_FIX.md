# "Failed to send message" Error - Troubleshooting Guide

## Issue Identified

The form is trying to connect to the wrong backend URL.

**Current frontend configuration:**
```
REACT_APP_BACKEND_URL=https://drilldown.preview.emergentagent.com
```

**This needs to point to your Railway backend URL instead.**

---

## Solution Steps

### Step 1: Get Your Railway Backend URL

1. Go to Railway dashboard
2. Click on your backend service
3. Go to **Settings** → **Networking**
4. Copy your public URL (looks like: `https://your-app.up.railway.app`)

### Step 2: Update Frontend Environment Variable

**For Local Development:**

Edit `/app/frontend/.env`:
```env
REACT_APP_BACKEND_URL=https://your-app.up.railway.app
```

**For Production (Netlify/Vercel):**

In your hosting platform dashboard, set:
```
REACT_APP_BACKEND_URL=https://your-app.up.railway.app
```

### Step 3: Rebuild Frontend

```bash
cd /app/frontend
yarn build
```

### Step 4: Redeploy Frontend

```bash
# If using Netlify
netlify deploy --prod --dir=build

# If using Vercel
vercel --prod
```

---

## Quick Test

After updating and redeploying:

### Test 1: Check Backend Directly

```bash
curl -X POST https://your-railway-url/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "message": "Testing connection"
  }'
```

**Expected:**
```json
{
  "success": true,
  "message": "...",
  "submission_id": "...",
  "email_sent": false
}
```

### Test 2: Check CORS

From browser console (F12) on your frontend:
```javascript
fetch('https://your-railway-url/api/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

**Expected:**
```json
{"message":"Drilldown Dynamics API is running"}
```

**If CORS error:**
Update Railway environment variable:
```
ALLOWED_ORIGINS=https://your-frontend-url.com
```

---

## Common Issues & Fixes

### Issue 1: CORS Error in Console

**Error:**
```
Access to fetch at 'https://railway-url/api/contact' from origin 
'https://frontend-url' has been blocked by CORS policy
```

**Fix:**
In Railway Variables, set:
```
ALLOWED_ORIGINS=https://your-frontend-url.com,https://www.your-frontend-url.com
```

Include both `www` and non-`www` versions if applicable.

---

### Issue 2: Network Error

**Error:**
```
Failed to send message. Please try again
```

**Possible Causes:**
1. Backend not running on Railway
2. Wrong backend URL in frontend
3. CORS not configured

**Fix:**
1. Check Railway logs - backend should be running
2. Verify `REACT_APP_BACKEND_URL` points to Railway
3. Set `ALLOWED_ORIGINS` in Railway

---

### Issue 3: 404 Not Found

**Error:**
```
POST https://railway-url/api/contact 404 (Not Found)
```

**Fix:**
Ensure Railway start command is:
```
./start.sh
```
or
```
bash -c "uvicorn server:app --host 0.0.0.0 --port $PORT"
```

---

### Issue 4: Backend URL Mismatch

**Check Current Configuration:**

Frontend:
```bash
cat /app/frontend/.env | grep BACKEND_URL
```

**Should output:**
```
REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
```

**If it shows something else, update it!**

---

## Environment Configuration Checklist

### Local Development (.env files):

**Frontend (`/app/frontend/.env`):**
```env
REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
```

**Backend (`/app/backend/.env`):**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=drilldown_dynamics
ALLOWED_ORIGINS=http://localhost:3000,https://your-production-frontend.com
```

### Production (Railway Variables):

**Backend Variables:**
```env
MONGO_URL=mongodb+srv://...
DB_NAME=drilldown_dynamics
ALLOWED_ORIGINS=https://your-frontend.netlify.app,https://www.your-frontend.netlify.app
```

### Production (Frontend Hosting - Netlify/Vercel):

**Environment Variables:**
```env
REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
```

---

## Step-by-Step Verification

### 1. Verify Backend is Running

**Railway Dashboard → Logs:**
Look for:
```
✓ Application startup complete
✓ Uvicorn running on http://0.0.0.0:PORT
```

### 2. Test Backend API

```bash
curl https://your-railway-url.up.railway.app/api/
```

**Expected:**
```json
{"message":"Drilldown Dynamics API is running"}
```

### 3. Test Contact Endpoint

```bash
curl -X POST https://your-railway-url.up.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","message":"hi"}'
```

**Expected:**
```json
{"success":true,"message":"...","submission_id":"...","email_sent":false}
```

### 4. Check Frontend Configuration

**Browser Console (F12) → Network Tab:**
- Submit form
- Look for POST request
- Check URL - should be `https://your-railway-url.up.railway.app/api/contact`
- Check response status - should be 200

### 5. Check CORS Headers

**In Network Tab:**
- Click on the POST request
- Go to **Headers** tab
- Look for Response Headers:
  - `access-control-allow-origin` should match your frontend URL

---

## Quick Fix Summary

**Most likely issue:** Frontend pointing to wrong backend URL

**Quick fix:**

1. **Get Railway URL** from dashboard
2. **Update frontend .env:**
   ```
   REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
   ```
3. **Update Railway ALLOWED_ORIGINS:**
   ```
   ALLOWED_ORIGINS=https://your-frontend-url.com
   ```
4. **Rebuild frontend:**
   ```bash
   cd /app/frontend && yarn build
   ```
5. **Redeploy frontend**
6. **Test form submission**

---

## If Still Not Working

### Check Browser Console

1. Open browser (F12)
2. Go to Console tab
3. Submit form
4. Look for errors:
   - Red errors about CORS → Fix ALLOWED_ORIGINS
   - 404 errors → Fix backend URL
   - Network errors → Check if Railway backend is running

### Check Railway Logs

1. Railway dashboard
2. Click backend service
3. Check Logs tab
4. Submit form from frontend
5. You should see:
   ```
   ✅ Contact submission stored successfully in MongoDB
   ```

If you don't see this, the request isn't reaching the backend.

---

## Current Status

Based on logs, I can see:
- ✅ Backend IS working (2 successful submissions at 13:08 and 13:09)
- ✅ MongoDB IS saving data
- ❌ Frontend might be configured to wrong URL

**Next steps:**
1. Update `REACT_APP_BACKEND_URL` to your Railway URL
2. Update `ALLOWED_ORIGINS` in Railway to your frontend URL
3. Rebuild and redeploy frontend

---

## Contact Me With

If still having issues, provide:
1. Railway backend URL
2. Frontend URL (Netlify/Vercel)
3. Browser console errors (screenshot)
4. Network tab showing the failed request

This will help diagnose the exact issue!
