# ⚔️ The Realm | 3D Interactive Portfolio

[![Live Deployment](https://img.shields.io/badge/Live-Deployment-FF8800?style=for-the-badge&logo=vercel)](https://arjun-shenoy-r.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **"Bridging the gap between complex machine learning algorithms and immersive digital experiences."**

Welcome to **The Realm**, the personal portfolio of **Arjun Shenoy R** — an AI/ML Engineer and Creative Developer.  
This project is a highly interactive, cinematic 3D web experience built to showcase technical projects, hackathon victories, and an ever-growing **"Maester's Chain"** of skills.

---

## 🔮 Features

- **Cinematic 3D Environment:**  
  A persistent, darkly atmospheric 3D scene featuring the Iron Throne, ambient floating embers (`<Sparkles />`), and a dynamic spotlight that physically tracks the user's cursor.

- **Living Lighting (Dragonfire):**  
  Custom WebGL lighting featuring a rhythmic pulsing base glow and a randomized flickering torch effect.

- **Glassmorphism UI:**  
  High-end, backdrop-blurred overlays that seamlessly render *over* the 3D canvas without reloading the scene.

- **Single Page Architecture (SPA):**  
  Instantaneous transitions between the 3D realm and data-heavy content overlays using Framer Motion.

- **Post-Processing Pipeline:**  
  Utilizes Bloom, Noise, and Vignette effects to create a gritty, film-like aesthetic.

- **Integrated Analytics:**  
  Real-time traffic and performance monitoring via Vercel Analytics.

---

## 🏛️ The Architecture

The project is **modularized** to keep the 3D engine separate from the React UI overlays.

- **`/components/3d/HeroScene.tsx`**  
  The core engine. Handles the Three.js Canvas, glTF model loading, dynamic lighting, and camera positioning.

- **`/components/ui/NavigationMenu.tsx`**  
  A sliding glass drawer for global site navigation.

- **`/components/ui/AboutOverlay.tsx`** *(The Archives)*  
  Contains personal mission statement, current status, and identity card.

- **`/components/ui/ProjectsOverlay.tsx`** *(Expeditions)*  
  A grid showcase of major works (like *Project AETHER*) and hackathon builds (*SafeHorizon*, *PromptGuard*, etc.).

- **`/components/ui/SkillsOverlay.tsx`** *(The Forge)*  
  The “Maester's Chain” detailing core languages, AI/ML focus, and a direct resume download.

---

## 🛠️ Technical Arsenal

### Core Engine
- [Next.js (App Router)](https://nextjs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Drei](https://github.com/pmndrs/drei) *(Camera, Environment, Sparks, glTF Loaders)*
- [React Postprocessing](https://docs.pmnd.rs/react-postprocessing/introduction)

### Styling & Animation
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Deployment & Monitoring
- [Vercel](https://vercel.com/)
- `@vercel/analytics`

---

## 🚀 Local Setup

To forge this realm on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/Arjun13-git/arjun-shenoy-r.git
cd arjun-shenoy-r
```


### 2. Install dependencies
```bash
npm install
```
### 3. Run the development server
```bash
npm run dev
```
### 4. Enter the Realm
Open [http://localhost:3000](http://localhost:3000/) in your browser.

> **Note:**  
> Ensure that your 3D models are placed in `/public/models/` and your images/resume are in the `/public/` root before launching.

## 👤 The Architect

**Arjun Shenoy R**  
6th-Semester CS Engineering Student @ *Sahyadri College of Engineering and Management*  

**Focus:** Artificial Intelligence, Machine Learning, Data Science, and Agentic AI  
**Hobbies:** Coding, reading novels, listening to music, and gaming  

🔗 **Connect:**  
[LinkedIn](https://www.linkedin.com/in/arjun-shenoy-r-586546285/) | [GitHub](https://github.com/Arjun13-git)
