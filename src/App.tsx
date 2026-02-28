import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import HeroOverview from './components/HeroOverview';
import MenuTabs from './components/MenuTabs';
import GallerySwiper from './components/GallerySwiper';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis exactly like cafesoquendo.com smooth scrolling effect
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary/30 text-foreground overflow-hidden">
      <CustomCursor />

      <main>
        <HeroOverview />

        {/* Intro Text Parallax Section */}
        <section className="py-32 px-4 md:px-12 max-w-6xl mx-auto relative z-20 bg-background text-center">
          <p className="font-serif text-3xl md:text-5xl leading-tight md:leading-snug text-foreground/90 mx-auto max-w-4xl">
            At Luscious Breads, we believe that <span className="text-primary italic">time</span> is our most important ingredient. Our breads are crafted using traditional fermentation techniques, resulting in loaves that are complex, deeply flavored, and shatteringly crisp.
          </p>
        </section>

        <GallerySwiper />
        <MenuTabs />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
