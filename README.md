# Range Rover Cinematic Web Experience

A high-performance, fan-made tribute web application showcasing the Range Rover through an immersive, cinematic, scroll-driven experience. Built with Next.js, this project pushes the boundaries of web animation, leveraging hardware-accelerated canvas rendering for buttery-smooth 60FPS video-like scroll sequences.

> **Disclaimer**: This is a fan-made tribute project created for educational and portfolio purposes. It is **not** affiliated with, endorsed, sponsored, or specifically approved by Jaguar Land Rover Limited or the Range Rover brand. All trademarks and copyrights belong to their respective owners.

## 🌟 Key Features

- **Cinematic Scroll Engine**: Custom-built HTML5 `<canvas>` rendering engine that perfectly syncs hundreds of high-resolution image frames to the user's scroll position without stuttering or video compression artifacts.
- **Dynamic Environment Switching**: Seamlessly transition between three diverse terrains (Forest, Desert, Mountain) on the fly using a custom double-buffered canvas system with CSS crossfading.
- **Hardware-Accelerated UI**: Highly optimized Framer Motion integrations providing smooth, physics-based text reveals and stat counters that don't block the main thread.
- **Editorial Image Mosaic**: A sophisticated, auto-masonry gallery that dynamically calculates image aspect ratios and resolutions to construct a visually impactful layout.
- **Performance First**: Extensive use of background progressive loading, requestAnimationFrame decoupling, Next.js dynamic imports, and strict tree-shaking compliance.

## 🛠️ Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (configured strictly with `LazyMotion` for tree-shaking)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```text
├── app/
│   ├── globals.css         # Global Tailwind directives & custom CSS
│   ├── layout.tsx          # Root layout and LazyMotion provider
│   └── page.tsx            # Main application assembly
├── components/
│   ├── ScrollSequence.tsx  # Core cinematic canvas engine
│   ├── HeroUI.tsx          # Animated environment text overlay
│   ├── EditorialMosaic.tsx # Server-side image analyzer
│   ├── EditorialMosaicUI.tsx # Client-side masonry gallery
│   └── ...                 # Other UI components
└── public/
    └── sequence/           # Raw high-res image sequence frames
```

## 🚀 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CodingGHOST12/Production_Range-Rover_WebPage.git
   cd Production_Range-Rover_WebPage
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000`.*

## ⚙️ Development Commands

- `npm run dev`: Starts the Next.js Turbopack development server.
- `npm run build`: Compiles the application for production deployment.
- `npm run start`: Runs the compiled production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🏗️ Production Build Instructions

To verify the production build locally before deployment:

```bash
npm run build
npm run start
```
*This simulates exactly how the application will perform when deployed.*

## 🌍 Deployment (Vercel)

This Next.js application is heavily optimized for zero-config deployment on Vercel.

1. Push your code to your GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click **Add New... > Project**.
3. Import your GitHub repository.
4. Leave all build commands and output directories as default (`npm run build` / `.next`).
5. Click **Deploy**. Vercel will automatically provision the edge network and optimize image serving.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). 
*Note again that the imagery and brand identity of Range Rover are protected properties of Jaguar Land Rover Limited.*
