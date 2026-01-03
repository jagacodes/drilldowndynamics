# Railway Environment Variables - Missing DB_NAME Error Fix

## ❌ Error Found

```
KeyError: 'DB_NAME'
```

**Cause:** Railway doesn't have the required environment variables set.

---

## ✅ Required Environment Variables

You MUST set these in Railway Variables tab:

### 1. MONGO_URL (Required)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 2. DB_NAME (Required) ← **This is missing!**
```
DB_NAME=drilldown_dynamics
```

### 3. ALLOWED_ORIGINS (Required)
```
ALLOWED_ORIGINS=https://your-frontend-url.com
```

---

## Step-by-Step Fix

### Step 1: Go to Railway Dashboard

1. Login to Railway: https://railway.app
2. Click on your project
3. Click on your **backend service**
4. Click **Variables** tab

### Step 2: Add DB_NAME Variable

**Click "New Variable"**

**Variable 1:**
- Name: `DB_NAME`
- Value: `drilldown_dynamics`
- Click **Add**

**Variable 2:**
- Name: `MONGO_URL`
- Value: `mongodb+srv://your-username:your-password@cluster.mongodb.net/?retryWrites=true&w=majority`
- Click **Add**

**Variable 3:**
- Name: `ALLOWED_ORIGINS`
- Value: `https://your-frontend-url.com`
- Click **Add**

### Step 3: Railway Auto-Redeploys

After adding variables, Railway will automatically restart your backend.

### Step 4: Check Deployment Logs

Go to **Deployments** tab and check logs for:
```
✓ Application startup complete
✓ Uvicorn running on http://0.0.0.0:PORT
```

---

## MongoDB Setup (If You Don't Have It)

### Option 1: MongoDB Atlas (Free)

1. **Sign up:** https://www.mongodb.com/cloud/atlas
2. **Create Cluster:**
   - Choose **FREE** tier (M0)
   - Select region closest to you
   - Create cluster (takes 5-10 minutes)

3. **Create Database User:**
   - Go to **Database Access**
   - Click **Add New Database User**
   - Choose username and password
   - **Save these credentials!**

4. **Whitelist IPs:**
   - Go to **Network Access**
   - Click **Add IP Address**
   - Select **Allow Access from Anywhere** (0.0.0.0/0)
   - Confirm

5. **Get Connection String:**
   - Go to **Database** → Click **Connect**
   - Choose **Connect your application**
   - Copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<username>` and `<password>` with your actual credentials

### Option 2: Railway MongoDB Plugin

1. In Railway dashboard, click **New**
2. Select **Database** → **Add MongoDB**
3. Railway automatically creates database and sets `MONGO_URL`
4. You still need to manually add `DB_NAME=drilldown_dynamics`

---

## Complete Railway Variables Configuration

After setup, you should have AT MINIMUM these 3 variables:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=drilldown_dynamics
ALLOWED_ORIGINS=https://your-frontend.netlify.app
```

**Optional (for email notifications):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@drilldowndynamics.com
EMAIL_TO=sales@drilldowndynamics.com
```

---

## Verification Steps

### Step 1: Check Deployment Succeeded

Railway Logs should show:
```
✓ Building...
✓ Installing dependencies
✓ Starting application
✓ Application startup complete
✓ Deployment successful
```

### Step 2: Test API

```bash
curl https://drilldowndynamics-production.up.railway.app/api/
```

**Expected:**
```json
{"message":"Drilldown Dynamics API is running"}
```

### Step 3: Test Contact Form

```bash
curl -X POST https://drilldowndynamics-production.up.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing MongoDB connection"
  }'
```

**Expected:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! Your message has been successfully stored in our database...",
  "submission_id": "...",
  "email_sent": false
}
```

### Step 4: Verify in MongoDB

1. Login to MongoDB Atlas
2. Go to **Browse Collections**
3. Select `drilldown_dynamics` database
4. Open `contact_submissions` collection
5. See your test submission

---

## Common Issues

### Issue 1: Still Getting KeyError

**Check:**
- Variable name is exactly `DB_NAME` (case-sensitive)
- No spaces in variable name
- Railway has redeployed after adding variable

**Fix:**
- Delete and re-add the variable
- Click "Redeploy" manually

### Issue 2: MongoDB Connection Failed

**Error:**
```
ServerSelectionTimeoutError
```

**Check:**
1. `MONGO_URL` is correct
2. Username and password in connection string are correct
3. IP `0.0.0.0/0` is whitelisted in MongoDB Atlas
4. Connection string format is correct

**Fix:**
- Test connection string locally first
- Verify credentials
- Check MongoDB Atlas network access

### Issue 3: Wrong Database Name

**If using different database name:**

Make sure `DB_NAME` in Railway matches your MongoDB database name.

```env
DB_NAME=your_actual_database_name
```

---

## Quick Checklist

Before backend works, ensure:

- [ ] `MONGO_URL` is set in Railway Variables
- [ ] `DB_NAME` is set to `drilldown_dynamics`
- [ ] `ALLOWED_ORIGINS` is set to your frontend URL
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] MongoDB user credentials are correct
- [ ] Railway deployment succeeded
- [ ] API responds at `/api/`
- [ ] Contact form endpoint works

---

## Expected Configuration

After completing setup:

**Railway Variables Tab should show:**
```
✓ MONGO_URL         mongodb+srv://...
✓ DB_NAME           drilldown_dynamics
✓ ALLOWED_ORIGINS   https://...
```

**Railway Logs should show:**
```
INFO: Application startup complete
INFO: Uvicorn running on http://0.0.0.0:PORT
```

**API should respond:**
```bash
curl https://drilldowndynamics-production.up.railway.app/api/
# {"message":"Drilldown Dynamics API is running"}
```

---

## Next Steps After Fix

1. ✅ Add all required variables to Railway
2. ✅ Wait for Railway to redeploy (automatic)
3. ✅ Test API endpoint
4. ✅ Test contact form submission
5. ✅ Verify data in MongoDB
6. ✅ Test from your frontend website

---

**TL;DR:**

Go to Railway → Your Backend Service → Variables tab

Add these 3 variables:
1. `MONGO_URL` = your MongoDB connection string
2. `DB_NAME` = `drilldown_dynamics`
3. `ALLOWED_ORIGINS` = your frontend URL

Railway will auto-redeploy and it will work! ✅
