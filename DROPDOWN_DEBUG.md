# Dropdown Debug Guide

## Current Implementation

### Desktop Behavior:
1. **Hover on "Products" or dropdown icon** → Opens dropdown
2. **Click dropdown icon** → Toggles dropdown
3. **Click "Products" text** → Goes to /products page
4. **Mouse leave** → Closes dropdown

### Mobile Behavior:
1. **Click dropdown icon** → Toggles dropdown
2. **Click "Products" text** → Goes to /products page

## Testing Steps:

1. **Desktop Test:**
   - Hover over "Products" → Dropdown should appear
   - Click the chevron icon → Dropdown should toggle
   - Click "Products" text → Should navigate to /products

2. **Mobile Test:**
   - Open hamburger menu
   - Click chevron icon → Dropdown should expand
   - Click "Products" text → Should navigate to /products

## If Still Not Working:

### Check Browser Console:
1. Press F12
2. Look for JavaScript errors
3. Check if onClick events are firing

### Quick Fix - Pure Click Mode:
If hover is causing issues, we can switch to click-only mode:

```javascript
// Remove onMouseEnter/onMouseLeave
// Keep only onClick on button
```

## Current Code Structure:

```jsx
<li className="dropdown">
  <div className="dropdown-wrapper" onMouseEnter/onMouseLeave>
    <Link to="/products">Products</Link>
    <button onClick={toggle}>
      <FaChevronDown />
    </button>
  </div>
  <ul className="dropdown-menu" onMouseEnter/onMouseLeave>
    {categories}
  </ul>
</li>
```

## CSS Requirements:

- `.dropdown-toggle-btn` must have `z-index: 10`
- `.dropdown-toggle-btn` must have `cursor: pointer`
- `.dropdown-menu.show` must have `display: block` or `opacity: 1`

## Common Issues:

1. **Icon not clickable** → Check z-index
2. **Dropdown closes immediately** → Check mouse events
3. **No visual feedback** → Check hover styles
4. **Mobile not working** → Check responsive CSS
