# 🎮 HACKCRAFT 2026 — Minecraft-Themed Hackathon Landing Page


  <strong>An immersive, interactive, pixel-perfect Minecraft-themed 24-hour hackathon landing page built with modern web technologies.</strong>
</p>

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

<div align="center">
  Crafted with ⛏️ & ❤️ for builders, hackers, and creators.
</div>
