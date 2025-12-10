# CSR Industries Website

Professional corporate website for CSR Industries - a certified manufacturer and erector of sugar industry equipment.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Modern UI**: Clean, professional industrial design with blue/gray color scheme
- **Multi-page Navigation**: Home, About, Products, Gallery, and Contact pages
- **Product Showcase**: Categorized product listings with filtering
- **Image Gallery**: Project photos with lightbox view
- **Contact Form**: Inquiry form for lead generation
- **SEO Optimized**: Meta tags and semantic HTML

## Technologies Used

- React.js 18
- React Router DOM for navigation
- React Icons for UI icons
- CSS3 for styling
- Responsive design principles

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
csr-industries-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── About.js
│   │   ├── About.css
│   │   ├── Products.js
│   │   ├── Products.css
│   │   ├── Gallery.js
│   │   ├── Gallery.css
│   │   ├── Contact.js
│   │   └── Contact.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Customization

### Update Company Information
- Edit contact details in `src/components/Footer.js` and `src/pages/Contact.js`
- Update phone numbers and email addresses

### Add Real Images
- Replace placeholder images in all page components
- Add product images to `/public/images/` folder
- Update image URLs in component files

### Modify Products
- Edit product data in `src/pages/Products.js`
- Add/remove product categories and items

### Update Content
- Modify text content in respective page components
- Update certifications and company details in About page

## Deployment

The website can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Contact

CSR Industries
Plot No. 382, Ekta Colony, Sangli
Phone: +91 9850123456
Email: info@csrindustries.com

## License

© 2025 CSR Industries. All rights reserved.
