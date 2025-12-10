# CSR Industries Website - Setup Guide

## Quick Start

### Step 1: Install Dependencies
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then install dependencies:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The website will open at `http://localhost:3000`

## Customization Checklist

### 1. Replace Placeholder Images
- [ ] Add company logo to `/public/` folder
- [ ] Add product images to `/public/images/products/`
- [ ] Add project photos to `/public/images/gallery/`
- [ ] Update image paths in component files

### 2. Update Contact Information
Files to edit:
- `src/components/Header.js` - Top bar contact info
- `src/components/Footer.js` - Footer contact details
- `src/pages/Contact.js` - Contact page details

Replace:
- Phone numbers (currently placeholder: +91 9850123456)
- Email addresses (currently: info@csrindustries.com)
- Google Maps embed URL with actual location

### 3. Update Company Content
- `src/pages/About.js` - Company profile, mission, vision
- `src/pages/Home.js` - Hero section text
- `src/pages/Products.js` - Product details and specifications

### 4. Add Real Product Data
In `src/pages/Products.js`, update the `products` array with:
- Actual product names
- Real specifications
- Product images
- PDF brochure links

### 5. Add Gallery Images
In `src/pages/Gallery.js`, update the `galleryImages` array with:
- Real project photos
- Actual project names
- Correct categories

### 6. SEO Optimization
Update `public/index.html`:
- Meta description
- Keywords
- Title
- Add favicon

## Features Implemented

✅ Responsive design (mobile, tablet, desktop)
✅ Multi-page navigation with React Router
✅ Product filtering by category
✅ Image gallery with lightbox
✅ Contact form with validation
✅ Professional header with sticky navigation
✅ Footer with company info and certifications
✅ SEO-friendly structure

## Additional Features to Add (Optional)

### 1. PDF Brochure Downloads
```javascript
// In Products.js, update download button:
<a href="/brochures/product-name.pdf" download>
  <FaDownload /> Download Brochure
</a>
```

### 2. WhatsApp Integration
```javascript
// Add to Contact page:
<a href="https://wa.me/919850123456" target="_blank">
  <FaWhatsapp /> Chat on WhatsApp
</a>
```

### 3. Email Form Backend
Options:
- EmailJS (free, no backend needed)
- Formspree
- Custom Node.js backend
- PHP mail script

### 4. Google Analytics
Add to `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Deploy automatically

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Option 3: Traditional Hosting
1. Build: `npm run build`
2. Upload `build/` folder to hosting
3. Configure server for React Router

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. Optimize images (use WebP format)
2. Lazy load images
3. Minify CSS/JS (automatic in production build)
4. Use CDN for static assets
5. Enable gzip compression on server

## Support

For issues or questions:
- Check React documentation: https://react.dev
- React Router docs: https://reactrouter.com

## Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Replace placeholder content
4. Add real images
5. Test on mobile devices
6. Deploy to production

Good luck with your website! 🚀
