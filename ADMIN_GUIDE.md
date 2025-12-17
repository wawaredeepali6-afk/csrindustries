# Admin Dashboard - Product Management Guide

## Firebase Database Structure

When adding products from admin dashboard, use this structure:

```javascript
products/
  ├── product-id/
  │   ├── name: "Product Name"
  │   ├── category: "boiling" // See categories below
  │   ├── description: "Short description for card"
  │   ├── fullDescription: "Detailed description for detail page"
  │   ├── image: "https://firebase-storage-url/image.jpg"
  │   ├── price: "Contact for pricing" (optional)
  │   ├── specs: ["Spec 1", "Spec 2", "Spec 3"] // Array or comma-separated string
  │   ├── features: ["Feature 1", "Feature 2"] // Array or comma-separated string
  │   ├── specifications: ["Tech spec 1", "Tech spec 2"] // Array or comma-separated string
  │   └── applications: ["Application 1", "Application 2"] // Array or comma-separated string
```

## Category Values

Use these exact category values (case-insensitive):

| Category ID | Display Name | Accepted Values |
|------------|--------------|-----------------|
| `boiling` | Boiling House | "boiling", "boiling house", "boiling house equipment" |
| `material` | Material Handling | "material", "material handling", "material handling equipment" |
| `process` | Process & Storage | "process", "process & storage", "process & storage equipment" |
| `mill` | Mill House | "mill", "mill house", "mill house equipment" |
| `spares` | Spares & Services | "spares", "spares & services" |
| `turnkey` | Turnkey Projects | "turnkey", "turnkey projects", "turnkey erection work" |

## Field Guidelines

### Required Fields:
- `name` - Product name (string)
- `category` - Category (use values from table above)
- `description` - Short description (1-2 lines)
- `image` - Product image URL from Firebase Storage

### Optional Fields:
- `fullDescription` - Detailed description for product detail page
- `price` - Pricing information
- `specs` - Key specifications (array or comma-separated)
- `features` - Product features (array or comma-separated)
- `specifications` - Technical specifications (array or comma-separated)
- `applications` - Use cases/applications (array or comma-separated)

## Array Fields Format

You can provide array fields in two formats:

### Format 1: Array (Recommended)
```javascript
specs: ["Capacity: 50-500 TPD", "Material: SS304/316", "Automatic control"]
```

### Format 2: Comma-separated String
```javascript
specs: "Capacity: 50-500 TPD, Material: SS304/316, Automatic control"
```

The website will automatically convert strings to arrays.

## Image Upload

1. Upload images to Firebase Storage
2. Get the download URL
3. Use that URL in the `image` field
4. Recommended image size: 800x600px or 1200x800px

## Example Product Entry

```javascript
{
  "name": "Crystallizer (Air Cooled / Vacuum Cooled)",
  "category": "boiling",
  "description": "High-efficiency crystallization systems for superior sugar crystal formation with precise temperature control.",
  "fullDescription": "Our crystallizers are engineered to deliver optimal performance in sugar crystallization processes. Available in both air-cooled and vacuum-cooled variants.",
  "image": "https://firebasestorage.googleapis.com/...",
  "specs": [
    "Air cooled and vacuum cooled variants",
    "Energy-efficient operation",
    "Consistent crystal quality"
  ],
  "features": [
    "Automated temperature control",
    "Easy maintenance access",
    "Durable construction"
  ],
  "specifications": [
    "Capacity: 50-500 TPD",
    "Material: SS304/316",
    "Temperature Range: 40-80°C"
  ],
  "applications": [
    "Sugar crystallization",
    "Crystal formation",
    "Industrial sugar production"
  ]
}
```

## Testing

After adding a product:
1. Check if it appears on the Products page
2. Verify category filtering works
3. Click "View Details" to see the detail page
4. Ensure all fields display correctly

## Troubleshooting

### Product not showing:
- Check Firebase Realtime Database rules (should allow read)
- Verify product is under `products/` node
- Check browser console for errors

### Category filter not working:
- Ensure category value matches accepted values
- Category names are case-insensitive
- Check spelling

### Images not loading:
- Verify Firebase Storage rules allow public read
- Check image URL is correct
- Ensure image is uploaded to Firebase Storage

## Firebase Rules

### Realtime Database Rules:
```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
