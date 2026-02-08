# Image Upload Guide for Grafene

## Supported Image Sources

Grafene automatically handles various image link formats:

### ✅ Supported Formats

1. **Google Drive** (Recommended)
2. **Dropbox**
3. **Direct Image URLs** (ending in .jpg, .png, .gif, etc.)
4. **Local Images** (in `/public` folder)

### ❌ Not Supported

- LinkedIn profile URLs or CDN links
- Private/authenticated URLs
- OneDrive links (limited support)

---

## How to Upload Images via Google Drive

### Step 1: Upload Image to Google Drive
1. Go to [Google Drive](https://drive.google.com)
2. Upload your image file
3. Right-click on the image
4. Select **"Share"** or **"Get link"**

### Step 2: Set Sharing Permissions
1. Click **"Change to anyone with the link"**
2. Make sure it's set to **"Viewer"** access
3. Click **"Copy link"**

### Step 3: Use the Link
1. Paste the copied link into the image URL field
2. The system will automatically convert it to a direct image URL

**Example Google Drive Link:**
```
https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
```

This will be automatically converted to:
```
https://drive.google.com/uc?export=view&id=1a2b3c4d5e6f7g8h9i0j
```

---

## Alternative: Dropbox

### Using Dropbox Links
1. Upload image to Dropbox
2. Right-click and select **"Share"**
3. Click **"Create link"**
4. Copy and paste the link

The system will automatically convert Dropbox links to direct URLs.

---

## Fallback System

If an image fails to load, the system will automatically:
1. Show an avatar with the person's initials
2. Use a color based on their name
3. Ensure the UI never breaks

---

## Best Practices

✅ **DO:**
- Use Google Drive for contributor photos
- Test the link before submitting
- Use high-quality images (at least 400x400px for contributors)
- Keep file sizes reasonable (< 2MB)

❌ **DON'T:**
- Use LinkedIn profile URLs
- Use private/authenticated links
- Use extremely large files (> 5MB)
- Use links that require login

---

## Troubleshooting

### Image Not Showing?
1. Check if the link is publicly accessible
2. Try opening the link in an incognito browser window
3. Make sure sharing is set to "Anyone with the link"
4. Verify the file is actually an image

### Still Having Issues?
- Use a direct image URL instead
- Upload to `/public/contributors/` folder locally
- Contact the Grafene team for help

---

## For Developers

The image handling is done by:
- `src/utils/imageUtils.js` - URL conversion logic
- `src/components/SmartImage.jsx` - Smart image component with fallbacks

To add support for more services, update the `getDirectImageUrl` function in `imageUtils.js`.
