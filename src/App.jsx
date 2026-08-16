import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import QuestGenerator from './components/QuestGenerator';
import Rules from './components/Rules';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Jukebox from './components/Jukebox';
import Hotbar from './components/Hotbar';
import ClickEffects from './components/ClickEffects';
import XPBar from './components/XPBar';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isNether, setIsNether] = useState(false);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 text-white ${
        isNether ? 'bg-mc-obsidian' : 'bg-mc-sky'
      }`}
    >
      {/* Global Interactive Click Particles & Sounds */}
      <ClickEffects soundEnabled={soundEnabled} />

      {!introCompleted && (
        <IntroScreen onComplete={() => setIntroCompleted(true)} />
      )}

      {introCompleted && <Navbar />}

      <main className={!introCompleted ? 'hidden' : 'block'}>
        <Hero isNether={isNether} onToggleRealm={() => setIsNether(!isNether)} />
        <About />
        <Timeline />
        <Prizes />
        <QuestGenerator />
        <Rules />
        <Sponsors />
        <FAQ />
        <Footer />
      </main>

      {/* Floating HUD & Progression */}
      {introCompleted && (
        <>
          <XPBar soundEnabled={soundEnabled} />
          <Jukebox
            soundEnabled={soundEnabled}
            onToggleSound={setSoundEnabled}
            autoPlayTrigger={introCompleted}
          />
          <Hotbar />
        </>
      )}
    </div>
  );
}
