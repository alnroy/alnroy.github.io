# ALAN ROY - Full Stack Developer Portfolio

A modern, interactive 3D portfolio website built with React, Three.js, and Tailwind CSS, featuring a sleek "Hi Anime" glassy aesthetic with glassmorphism effects and smooth animations.

## 🌟 Features

- **Interactive 3D Hero Scene**: WebGL-powered 3D animations using Three.js
- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **SEO Optimized**: Complete meta tags and semantic HTML
- **Multi-page Navigation**: Separate routes for About, Projects, Resume, and Contact
- **Project Showcase**: Interactive project cards with detailed modals
- **Contact Form**: Integrated contact form with validation

## 🎨 Design System

- **Colors**: Cyan/blue gradients with magenta accents
- **Effects**: Neon glows, glass blur, soft shadows
- **Typography**: Modern sans-serif with gradient text effects
- **Animations**: Fade-in-up, scale, float, and parallax effects

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI
- **Build Tool**: Vite
- **Routing**: React Router v6

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080`

## 🚀 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Manual Deployment

1. Build the project: `npm run build`
2. The `dist` folder contains production-ready files
3. Upload the contents to your hosting service

### Other Platforms

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Cloudflare Pages**: Connect repo and deploy with zero configuration

## 📝 Customization

### Update Personal Information

1. **Contact Details**: Edit `src/components/AboutSection.tsx`
2. **Skills**: Modify `src/components/SkillsSection.tsx`
3. **Experience**: Update `src/components/ExperienceSection.tsx`
4. **Projects**: Edit `src/components/ProjectsSection.tsx`

### Design System

- **Colors**: Edit HSL values in `src/index.css` (lines 10-30)
- **Animations**: Customize in `tailwind.config.ts` (keyframes section)
- **Gradients**: Update gradient tokens in `src/index.css`

### 3D Scene

- **Geometry**: Modify shapes in `src/components/Hero3D.tsx`
- **Colors**: Change material colors in the same file
- **Animation Speed**: Adjust rotation and float speeds

### Project Images

Replace project images with your own:
1. Add images to `src/assets/` or `public/images/`
2. Update image paths in `src/components/ProjectsSection.tsx`
3. For best results, use 800x600px images

### Resume PDF

Place your resume PDF in `public/resume.pdf` or update the link in:
- `src/components/HeroSection.tsx`
- `src/pages/Resume.tsx`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Optimization

- **Code Splitting**: Automatic via Vite
- **Lazy Loading**: Components load on-demand
- **Image Optimization**: Use WebP format when possible
- **3D Scene**: Optimized with minimal geometry

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contact

- **Email**: alanroyffl01@gmail.com
- **Phone**: +91 7511136171
- **Portfolio**: [alnroy.github.io](https://alnroy.github.io)
- **GitHub**: [github.com/alnroy](https://github.com/alnroy)

---

Built with ❤️ using React, Three.js, and Tailwind CSS
