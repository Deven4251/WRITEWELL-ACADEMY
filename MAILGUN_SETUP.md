# Mailgun Configuration for Render

## Your Mailgun Credentials

**⚠️ IMPORTANT: Never commit API keys to GitHub!**

Get your credentials from your Mailgun dashboard:
- API Key: Go to Dashboard → Sending → Domain Settings → Private API key
- Sandbox Domain: Found in your Mailgun dashboard
- Base URL: https://api.mailgun.net (US Region) or https://api.eu.mailgun.net (EU Region)

---

## Step-by-Step: Add to Render

### 1. Go to Render Dashboard
- Navigate to: https://dashboard.render.com
- Select your backend service

### 2. Open Environment Variables
- Click on **"Environment"** tab
- You'll see all your current environment variables

### 3. Remove Old Email Variables (if they exist)
Delete these if they're still there:
- `EMAIL_USER` ❌
- `EMAIL_PASS` ❌

### 4. Add Mailgun Variables
Click **"Add Environment Variable"** and add each of these:

**Variable 1:**
- Key: `MAILGUN_API_KEY`
- Value: `your-mailgun-api-key-here` (Get from Mailgun Dashboard → Sending → Domain Settings)

**Variable 2:**
- Key: `MAILGUN_DOMAIN`
- Value: `your-sandbox-domain.mailgun.org` (Get from Mailgun Dashboard)

**Variable 3:**
- Key: `MAILGUN_FROM_EMAIL`
- Value: `noreply@your-sandbox-domain.mailgun.org`

**Variable 4 (keep existing):**
- Key: `ADMIN_EMAIL`
- Value: `academywritewell@gmail.com` (should already exist)

**Variable 5 (optional):**
- Key: `MAILGUN_REGION`
- Value: `us` (or leave it out, defaults to US)

### 5. Save Changes
- Click **"Save Changes"**
- Render will automatically redeploy your service

---

## Complete Environment Variables List

After setup, you should have these in Render:

```env
PORT=5000

MONGO_URI=mongodb+srv://devmon1715_db_user:muqOv5a5ICwJ69zr@writewellacademy.zwwmfhd.mongodb.net/?appName=WRITEWELLACADEMY

MAILGUN_API_KEY=your-mailgun-api-key-here
MAILGUN_DOMAIN=your-sandbox-domain.mailgun.org
MAILGUN_FROM_EMAIL=noreply@your-sandbox-domain.mailgun.org

ADMIN_EMAIL=academywritewell@gmail.com

ADMIN_SECRET=myUltraStrongAdminSessionSecret

VITE_API_URL=https://writewell-academy-1.onrender.com
```

---

## ⚠️ Important: Sandbox Domain Limitation

**Sandbox domains can only send to authorized recipients!**

Since you're using a sandbox domain, you MUST authorize your email address in Mailgun:

1. Go to: https://app.mailgun.com/app/sending/domains
2. Click on your sandbox domain
3. Go to **"Authorized Recipients"** tab
4. Click **"Add Recipient"**
5. Add: `academywritewell@gmail.com`
6. Verify the email when Mailgun sends you a verification email

**Without authorization, emails will fail!**

---

## 🧪 Testing

After deploying:

1. Submit a test contact form
2. Check Render logs for:
   - `📧 Mailgun config:` - Should show your domain
   - `📤 Sending email via Mailgun...`
   - `✅ Email sent successfully via Mailgun!`
3. Check your email inbox (and spam folder)

---

## 📧 Production Setup (Later)

When ready for production:
1. Add and verify your own domain in Mailgun
2. Update DNS records as instructed by Mailgun
3. Update `MAILGUN_DOMAIN` to your verified domain
4. Update `MAILGUN_FROM_EMAIL` to use your domain

---

## 🐛 Troubleshooting

- **401/403 Error**: Check API key is correct
- **404 Error**: Check domain name matches exactly
- **Email not received**:
  - Check spam folder
  - Verify recipient is authorized (for sandbox)
  - Check Mailgun dashboard → Logs for delivery status
