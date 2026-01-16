

# Google Sheets Backend Setup Guide for ShareDesktopMe

This guide shows you how to set up a free Google Sheets backend to store wallpaper metadata for ShareDesktopMe. Images are hosted on Catbox.moe while Google Sheets stores the URLs and information.

---

## Step 1: Create Your Google Sheet

1. Go to [https://sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it "ShareDesktopMe Database"
4. In Row 1, create these column headers:

| A | B | C | D | E |
|---|---|---|---|---|
| url | title | category | description | date |

**Important**: Column names must match exactly (lowercase, no spaces).

---

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy and paste this complete script:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  }).filter(item => item.url); // Only return entries with URLs
  
  return Content Service
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append new row with  wallpaper data
    sheet.appendRow([
      data.title,
      data.description || '',
      data.category,
      data.url,
      data.date
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾) or press `Ctrl+S`
5. Name your project "ShareDesktopMe API"

---

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: ShareDesktopMe API v1
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize access** when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to ShareDesktopMe API (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** that appears - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbxxx.../exec
   ```
8. Click "Done"

---

## Step 4: Configure Your Website

1. Open `js/app.js` in your website code
2. Find the CONFIG object (around line 7-13)
3. Replace BOTH URLs with your Web App URL:

```javascript
const CONFIG = {
    itemsPerPage: 12,
    maxFileSize: 10 * 1024 * 1024,
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    cacheTTL: 5 * 60 * 1000,
    catbox: {
        uploadUrl: 'https://catbox.moe/user/api.php',
        userHash: '263f7d1e69e40222f18b868a9'
    },
    apiUrl: {
        get: 'YOUR_WEB_APP_URL_HERE',  // ← Paste here
        post: 'YOUR_WEB_APP_URL_HERE'  // ← Same URL
    }
};
```

4. Save the file

---

## Step 5: Test the Integration

### Test GET (Retrieve wallpapers):
1. Open your Web App URL directly in a browser
2. You should see: `[]` (empty array if no data yet)
3. This confirms the GET endpoint works!

### Test POST (Upload a wallpaper):
1. Open your website in a browser
2. Click "Upload Wallpaper"
3. Fill in all fields:
   - Select category (Desktop or Mobile)
   - Upload an image (JPG, PNG, WebP, or GIF - max 10MB)
   - Enter a title
   - (Optional) Add a description
4. Click "Upload Wallpaper"
5. Check your Google Sheet - a new row should appear!

**If successful**, you'll see:
- A notification: "Wallpaper uploaded successfully! 🎉"
- New row in Google Sheet with all your data
- The image URL starts with `https://files.catbox.moe/`

---

## Troubleshooting

### Error: "Access Denied"
**Solution**: Redeploy with correct permissions
1. Go to Apps Script → Deploy → Manage deployments
2. Click the edit icon (pencil)
3. Set "Who has access" to **Anyone**
4. Click "Deploy"

### Error: "Script Error" when uploading
**Solution**: Check Apps Script logs
1. Open Apps Script editor
2. Click Executions (left sidebar)
3. Look for errors in recent executions
4. Common issues:
   - Column names don't match exactly
   - Wrong data format being sent

### Images don't appear on the website
**Possible causes**:
- Catbox URL is invalid
- Sheet URL column is empty
- GET endpoint isn't returning data

**Check**:
1. Open Web App URL in browser - should show JSON array
2. Verify Catbox URLs start with `https://files.catbox.moe/`
3. Check browser console for errors (F12 → Console)

### CORS errors in browser console
This is **normal** for Google Apps Script POST requests. The upload still works even if you see CORS errors.

---

##Data Structure

Each row in your Google Sheet represents one wallpaper:

| Column | Required | Type | Description |
|--------|----------|------|-------------|
| url | ✅ Yes | Text | Catbox.moe image URL |
| title | ✅ Yes | Text | Wallpaper title (max 100 characters) |
| category | ✅ Yes | Text | Must be 'pc' or 'mobile' |
| description | ❌ No | Text | Optional description (max 300 characters) |
| date | ✅ Yes | Text | ISO 8601 timestamp (auto-generated) |

**Example data**:

| url | title | category | description | date |
|-----|-------|----------|-------------|------|
| https://files.catbox.moe/abc123.jpg | Mountain Sunset | pc | Beautiful landscape view | 2026-01-16T16:30:00Z |
| https://files.catbox.moe/def456.png | Ocean Waves | mobile | Calm beach scene | 2026-01-16T17:00:00Z |

---

## Security Considerations

⚠️ **Important Notes**:
- Your Google Apps Script URL is public
- Anyone who knows the URL can upload wallpapers
- No authentication is currently implemented
- Consider adding rate limiting for production use
- **Backup your sheet regularly** (File → Make a copy)

---

## Updating the Deployment

If you make changes to the Apps Script code:
1. Click **Deploy** → **Manage deployments**
2. Click the edit icon (pencil) next to your deployment
3. Change "Version" to **New version**
4. Click **Deploy**
5. **The URL stays the same** - no need to update your website!

---

## Advanced: Rate Limiting (Optional)

To prevent spam, add this to the top of `doPost`:

```javascript
function doPost(e) {
  // Simple rate limiting by IP (stores in script properties)
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  
  try {
    const props = PropertiesService.getScriptProperties();
    const ip = e.parameter.userip || 'unknown';
    const lastUpload = props.getProperty(`lastUpload_${ip}`);
    const now = Date.now();
    
    // Allow one upload per IP every 60 seconds
    if (lastUpload && (now - parseInt(lastUpload)) < 60000) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Please wait 60 seconds between uploads' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    props.setProperty(`lastUpload_${ip}`, now.toString());
    
    // ... rest of doPost code
  } finally {
    lock.releaseLock();
  }
}
```

---

## Need Help?

1. **Check Apps Script logs**: Executions tab shows all activity
2. **Test endpoints separately**: GET and POST independently
3. **Verify sheet structure**: Column names must match exactly
4. **Check Catbox integration**: Test upload to Catbox separately

**Common Issues**:
- ❌ Column name typo → Fix in Sheet Row 1
- ❌ Wrong URL format → Must end with `/exec`
- ❌ Authorization failed → Redeploy and re-authorize

---

## Success Checklist

- [  ] Google Sheet created with correct columns
- [ ] Apps Script deployed as Web App
- [ ] "Anyone" has access to deployment
- [ ] Web App URL copied
- [ ] CONFIG in `js/app.js` updated
- [ ] GET endpoint returns `[]` when tested
- [ ] Test upload successful
- [ ] New row appears in sheet
- [ ] Image visible on website

---

**You're all set!** 🎉 Your ShareDesktopMe website now has a fully functional backend powered by Google Sheets and Catbox.moe.
