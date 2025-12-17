# Gallery Admin Guide

## Accessing Gallery Upload (Admin Dashboard)

To upload images to the gallery, navigate to:

```
http://localhost:3000/gallery/upload
```

Or in production:
```
https://yourdomain.com/gallery/upload
```

## How to Upload Images

1. **Navigate to Upload Page**: Go to `/gallery/upload`
2. **Fill in Details**:
   - **Image Title**: Enter a descriptive title for the image
   - **Category**: Select from available categories:
     - Boiling House Equipment
     - Material Handling
     - Process Equipment
     - Mill House
     - Projects
     - Fabrication
3. **Upload Image**: Click "Choose an image" and select your image file (max 5MB)
4. **Preview**: You'll see a preview of the selected image
5. **Submit**: Click "Upload Image" button

## Features

- ✅ Images are stored in Firebase Storage
- ✅ Image metadata saved in Firebase Realtime Database
- ✅ Automatic image URL generation
- ✅ Real-time updates on gallery page
- ✅ Images sorted by upload date (newest first)
- ✅ Collage-style gallery layout with horizontal scrolling
- ✅ Lightbox view for full-size images

## Gallery Display

The gallery page (`/gallery`) displays uploaded images in two rows:
- **Top Row**: Scrolls left with first half of images
- **Bottom Row**: Scrolls right with second half of images
- **Collage Effect**: Different card sizes for visual interest
- **Click to Enlarge**: Click any image to view in lightbox

## Firebase Structure

### Storage Path
```
gallery/
  └── {timestamp}_{filename}
```

### Database Structure
```json
{
  "gallery": {
    "uniqueId": {
      "title": "Image Title",
      "category": "Category Name",
      "imageUrl": "https://...",
      "uploadedAt": 1234567890,
      "fileName": "gallery/timestamp_filename.jpg"
    }
  }
}
```

## Security Note

⚠️ **Important**: The upload page is currently publicly accessible. For production, you should:
1. Add Firebase Authentication
2. Restrict upload access to admin users only
3. Add proper security rules in Firebase

## Firebase Security Rules (Recommended)

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{imageId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

### Database Rules
```json
{
  "rules": {
    "gallery": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```
