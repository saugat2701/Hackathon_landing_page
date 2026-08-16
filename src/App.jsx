import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Rules from './components/Rules';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <div className="relative min-h-screen bg-mc-sky text-white">
      {!introCompleted && (
        <IntroScreen onComplete={() => setIntroCompleted(true)} />
      )}

      {introCompleted && <Navbar />}

      <main className={!introCompleted ? 'hidden' : 'block'}>
        <Hero />
        <About />
        <Timeline />
        <Prizes />
        <Rules />
        <Sponsors />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
