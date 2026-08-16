# 🎮 HACKCRAFT 2026 — Minecraft-Themed Hackathon Landing Page

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<p align="center">
  <strong>An immersive, interactive, pixel-perfect Minecraft-themed 24-hour hackathon landing page built with modern web technologies.</strong>
</p>

[✨ Live Demo](#) • [🚀 Getting Started](#-getting-started) • [🌟 Features](#-features) • [🕹️ Interactive HUD](#️-interactive-hud--gameplay) • [📁 Project Structure](#-project-structure)

</div>

---

## 🌟 Features

### 🌲 Dual-Realm Switching (Overworld & Nether)
- **Overworld Realm**: Vibrant sky, floating clouds with parallax mouse effects, and grass/dirt block terrain.
- **Nether Realm**: Obsidian and netherrack theme with glowing purple portal auras, ghast particles, and dark aesthetic.
- Toggle between realms on the fly with custom portal SFX and seamless CSS theme transitions.

### ⏳ Ender Dragon Boss Health Bar (Live Countdown)
- Live ticking 24-hour hackathon countdown styled as an Ender Dragon boss health bar with dynamic gradient animations.

### 🎲 Enchanting Table Quest Generator
- Interactive project idea spinner featuring multiple hackathon tracks:
  - 🤖 **Redstone AI Assistant** (Artificial Intelligence)
  - 🔮 **Nether Realm Web3 / Crypto** (Decentralized Apps)
  - 🌿 **Overworld Health & Gamification** (Healthcare)
  - 🪙 **Village Economy & Fintech** (Fintech)
  - 🛡️ **Bedrock Security & DevTools** (Cybersecurity)
- Displays difficulty ratings, bounty loot rewards, and animated enchantment rolls.

### 📻 8-Bit Jukebox & Sound System
- Built-in retro audio player with 8-bit chiptunes and Minecraft sound effects (block clicks, XP level-ups, chest opens, portal hums).
- Sound toggle and volume control.

### 🏆 Loot Chests & Prizes
- Tiered reward showcases (Diamond, Emerald, Gold, Iron tiers) with ₹1,00,000+ total prize pool display and loot animations.

### 🗺️ Quest Timeline & Survival Guide
- Step-by-step 24-hour survival timeline with GSAP scroll-triggered animations.

### ⛏️ Retro Minecraft Design System
- Pixelated typography (`Press Start 2P`, `VT323`).
- Custom 3D block borders, pixel buttons (`mc-btn`, `mc-btn-play`), stone and dirt textures, and interactive hover animations.
- Dynamic click particles (leaves, dirt, stone, diamonds) on user interaction.

---

## 🕹️ Interactive HUD & Gameplay

- **Animated World Gen Intro Screen**: Steve walks and builds the "HACKCRAFT" title block-by-block with chunk loading messages and realistic block-placing audio.
- **XP Progression Bar**: Real-time XP level bar at the bottom that levels up as participants scroll through the page.
- **Floating Inventory Hotbar**: Quick-access navigation bar styled like the Minecraft inventory hotbar with tooltips and active slot indicators.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Pixel Art CSS Engine
- **Animations**: [GSAP (GreenSock)](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saugat2701/Hackathon_landing_page.git
   cd Hackathon_landing_page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` (or the URL shown in your terminal).

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and builds production-ready bundle in the `dist` directory |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Runs Oxlint to check code quality and lint errors |

---

## 📁 Project Structure

```text
Hackathon_landing_page/
├── public/                # Static assets
├── src/
│   ├── assets/            # Project images and textures
│   ├── components/
│   │   ├── About.jsx          # Event lore & introduction
│   │   ├── ClickEffects.jsx   # Interactive click particles & SFX
│   │   ├── FAQ.jsx            # Crafting recipe accordion FAQ
│   │   ├── Footer.jsx         # Bedrock footer & social links
│   │   ├── Hero.jsx           # Main hero banner, boss bar, realm toggle
│   │   ├── Hotbar.jsx         # Floating inventory hotbar navigation
│   │   ├── IntroScreen.jsx    # Animated Steve chunk generator intro
│   │   ├── Jukebox.jsx        # 8-bit music player & sound controls
│   │   ├── Navbar.jsx         # Main navigation bar
│   │   ├── Prizes.jsx         # Loot boxes and prize tiers
│   │   ├── QuestGenerator.jsx # Enchanting table project tracks
│   │   ├── Rules.jsx          # Server rules & code of conduct
│   │   ├── Sponsors.jsx       # Guilds & sponsor partners
│   │   ├── Timeline.jsx       # 24-hour quest schedule
│   │   └── XPBar.jsx          # Scroll-based XP progression bar
│   ├── App.css            # Base animations and styles
│   ├── App.jsx            # Main app shell and state coordination
│   ├── index.css          # Design system, Minecraft textures, pixel fonts
│   └── main.jsx           # React root mounting
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## 🎨 Customization

### Changing Event Dates and Details
- Open [src/components/Hero.jsx](file:///c:/Project1/src/components/Hero.jsx) to update the hackathon name, date, and prize pool.
- Open [src/components/Timeline.jsx](file:///c:/Project1/src/components/Timeline.jsx) to modify the schedule checkpoints.
- Open [src/components/QuestGenerator.jsx](file:///c:/Project1/src/components/QuestGenerator.jsx) to add or adjust project tracks.

### Customizing Sounds & Music
- Open [src/components/Jukebox.jsx](file:///c:/Project1/src/components/Jukebox.jsx) to replace or add background tracks and 8-bit sound effects.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


---

<div align="center">
  Crafted with ⛏️ & ❤️ for builders, hackers, and creators.
</div>
