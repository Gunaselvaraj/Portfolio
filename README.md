# Unity Game Developer Portfolio Website

A modern, responsive portfolio website designed for Unity game developers to showcase their projects, skills, and expertise.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Gaming-themed design with smooth animations and gradients
- **Project Showcase**: Display your Unity games with images and descriptions
- **Skills Section**: Highlight your technical expertise in Unity, C#, and game development
- **Contact Form**: Allow potential clients and collaborators to reach out
- **Smooth Navigation**: Animated scroll effects and mobile-friendly hamburger menu

## Project Structure

```
portfolio/
├── index.html      # Main HTML file
├── styles.css      # CSS styling with responsive design
├── script.js       # JavaScript for interactivity
└── README.md       # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local web server for testing (Live Server, Python HTTP server, etc.)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

### Using Live Server (Recommended)

If you're using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Customization

### Adding Your Information

1. **Hero Section**: Update the title and description in `index.html` (around line 25)
2. **About Section**: Replace the placeholder text with your personal bio (around line 37)
3. **Projects**: Edit project cards with your game details, screenshots, and descriptions (starting line 50)
4. **Skills**: Customize the skills section to match your expertise (starting line 122)
5. **Contact Info**: Add your actual email, LinkedIn, and GitHub links (around line 182)

### Adding Images

Replace the placeholder divs with actual images:

```html
<!-- Replace this: -->
<div class="placeholder-image">Game Screenshot</div>

<!-- With this: -->
<img src="path/to/your/image.jpg" alt="Game Screenshot">
```

**Note**: All placeholder images should be replaced with actual screenshots, photos, or graphics for your portfolio.

### Color Scheme

The color scheme can be customized in `styles.css` by modifying the CSS variables at the top:

```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --accent-color: #fd79a8;
    /* ... etc */
}
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, grid, gradients, and animations
- **JavaScript**: Interactive features and smooth scrolling
- **Responsive Design**: Mobile-first approach with media queries

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

You can deploy this portfolio to various hosting platforms:

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Simple drag-and-drop deployment
- **Vercel**: Fast deployment with automatic HTTPS
- **Firebase Hosting**: Google's hosting platform

## Contact Form

The contact form currently displays an alert on submission. To make it functional, integrate it with:

- **FormSpree**: Easy form backend service
- **Netlify Forms**: Built-in form handling
- **EmailJS**: Send emails directly from JavaScript
- **Custom Backend**: PHP, Node.js, or other server-side solution

## License

This project is free to use for personal and commercial purposes.

## Author

Unity Game Developer Portfolio Template

---

**Note**: Remember to replace all placeholder content with your actual information, images, and project details before deploying your portfolio!
