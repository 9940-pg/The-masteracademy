# 🎓 The Master Academy (Global & UAE Platform)

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://the-master-academy-pi.vercel.app/)
[![React](https://img.shields.io/badge/React-18%2F19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Render](https://img.shields.io/badge/API%20Hosted-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

A modern, high-performance tech education platform offering hands-on bootcamps, 12-week master programs, and intensive 2-hour crash courses in **Python & AI**, **Full-Stack Web Development**, and **AWS Cloud Computing & DevOps**.

The repository is built as a unified multi-region platform featuring an **English (Global)** version and a fully localized **Arabic (UAE / Middle East)** RTL experience.

---

## 🌐 Live Deployments

| Region / Service | URL | Language / Mode |
| :--- | :--- | :--- |
| **Global Website** | [https://the-master-academy-pi.vercel.app/](https://the-master-academy-pi.vercel.app/) | English (LTR) |
| **UAE & Middle East Website** | [https://the-master-academy-pi.vercel.app/uae/](https://the-master-academy-pi.vercel.app/uae/) | Arabic (RTL) |
| **Global Backend API** | [https://master-academy-api.onrender.com](https://master-academy-api.onrender.com) | Express REST API |
| **UAE Backend API** | [https://the-masteracademy.onrender.com](https://the-masteracademy.onrender.com) | Express REST API |

---

## 📁 Repository Structure

```text
The-Master-Academy/
├── Frontend/                           # Global English Frontend (React + Vite)
│   ├── src/
│   │   ├── components/                 # UI Components (Hero, Navbar, Courses, FAQ, etc.)
│   │   │   ├── CodeParticlesTrail.jsx  # Interactive coding syntax particle cursor trail
│   │   │   ├── SpotlightCard.jsx       # Card container with smooth scroll-reveal animation
│   │   │   └── LanguageModal.jsx       # Region / language switcher popup
│   │   ├── data/                       # Course and mentor catalog data
│   │   ├── App.jsx                     # English site root layout
│   │   └── index.css                   # Tailwind styles and custom design tokens
│   └── package.json
│
├── The-Master-Academy-UAE/             # UAE & Arabic Platform
│   ├── Frontend/                       # UAE Arabic Frontend (React + Vite + RTL)
│   │   ├── src/
│   │   │   ├── components/             # Localized Arabic components
│   │   │   ├── data/                   # AED-priced course modules and UAE testimonials
│   │   │   └── App.jsx
│   │   └── package.json
│   └── Backend/                        # UAE Express API service
│       ├── src/
│       └── package.json
│
├── Backend/                            # Global Express API service
│   ├── src/
│   │   ├── routes/                     # Contact, lead capture, and enrollment routes
│   │   └── server.js
│   └── package.json
│
├── build-all.js                        # Unified build script bundling both sites for Vercel
├── vercel.json                         # Vercel deployment routes & API proxy rewrites
└── package.json                        # Root workspace configuration
```

---

## ✨ Key Features & Interactive Aesthetics

* **Dual-Language & Localization:**
  * Auto language modal on arrival guiding learners to either **English (Global)** or **العربية (الإمارات / UAE)**.
  * Native Arabic RTL layout with customized typography (`Tajawal` / `Cairo`).
  * Currency support: Indian Rupee (INR ₹) for Global, UAE Dirham (AED د.إ) for Middle East.

* **Interactive Code Syntax Cursor Trail:**
  * Emits subtle, floating purple developer syntax particles (`<>`, `</>`, `{}`, `[]`, `;`, `!`, `=>`, `//`, `$$`) that float and disperse as the user navigates.
  * **Ultra-Lightweight:** 0% CPU usage when the mouse stops moving (automatic sleep loop).

* **Scroll-Reveal Entrance Animations:**
  * Cards across Programs, Courses, Masterclasses, Trainers, Why Us, and Student Success use native `IntersectionObserver` to smoothly slide up and fade into view as you scroll.
  * Staggered cascade delays create a wave animation across grid items.

* **Course Offerings & Masterclasses:**
  * **Intensive Crash Courses (2 Hours):** Live interactive sessions with live coding and Q&A.
  * **Flagship Master Programs (12 Weeks):** 48 hours of live training, 5+ portfolio projects, 1-on-1 career mentoring, and mock technical interviews.

* **Lead Capture & Direct WhatsApp Integration:**
  * Modal and embedded contact inquiry forms connected to Express API backends.
  * Instant WhatsApp floating button for admissions and syllabus queries.

---

## 🛠️ Tech Stack

* **Frontend:** [React 18/19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), HTML5 Canvas 2D
* **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [CORS](https://www.npmjs.com/package/cors), [Nodemailer](https://nodemailer.com/)
* **Hosting & CDN:** [Vercel](https://vercel.com/) (Frontend Single-Bundle Deployment), [Render](https://render.com/) (Cloud Backend APIs)

---

## 🚀 Local Development Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the repository
```bash
git clone https://github.com/9940-pg/The-masteracademy.git
cd The-masteracademy
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install Global Frontend dependencies
cd Frontend && npm install && cd ..

# Install UAE Frontend dependencies
cd The-Master-Academy-UAE/Frontend && npm install && cd ../..
```

### 3. Run development servers

To run the **Global English** site:
```bash
npm run dev:en
# Available at http://localhost:5173
```

To run the **UAE Arabic** site:
```bash
npm run dev:uae
# Available at http://localhost:5174
```

To run the **Backend API**:
```bash
cd Backend && npm run dev
# API server listening on http://localhost:5000
```

---

## 📦 Production Build & Deployment

The platform uses a custom build pipeline (`build-all.js`) that:
1. Compiles the English frontend into `Frontend/dist`.
2. Compiles the UAE frontend with base path `/uae/`.
3. Copies the UAE distribution into `Frontend/dist/uae`.
4. Outputs a unified artifact ready for Vercel.

### Build locally:
```bash
node build-all.js
```

### Deploy to Vercel:
```bash
npx vercel --prod
```

---

## ⚙️ Vercel Routing Configuration (`vercel.json`)

The single Vercel deployment handles routing for both the Global site, UAE site, and proxies API calls to the Render backends:

* `/` ➔ Global English App (`Frontend/dist/index.html`)
* `/uae` & `/uae/*` ➔ UAE Arabic App (`Frontend/dist/uae/index.html`)
* `/api/*` ➔ Proxies to Global Render Backend (`https://master-academy-api.onrender.com/api/*`)
* `/uae-api/*` ➔ Proxies to UAE Render Backend (`https://the-masteracademy.onrender.com/api/*`)

---

## 📞 Contact & Admissions

* **Website:** [the-master-academy-pi.vercel.app](https://the-master-academy-pi.vercel.app/)
* **WhatsApp Admissions:** [+91 93257 19765](https://wa.me/919325719765)
* **Email:** [themasteracademy26@gmail.com](mailto:themasteracademy26@gmail.com)
* **Instagram:** [@learn.withmasteracademy](https://instagram.com/learn.withmasteracademy)
* **YouTube:** [@the_masteracademy](https://youtube.com)

---

Developed with ❤️ by **The Master Academy Team**.
