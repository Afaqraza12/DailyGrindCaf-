import React from 'react';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import Ritual from '../components/Ritual';
import Experience from '../components/Experience';
import Reviews from '../components/Reviews';
import useSEO from '../hooks/useSEO';

const Home = () => {
  useSEO({
    title: 'Daily Grind Café | Elite Performance Coffee',
    description: 'Fuel your ambition with Daily Grind Café. Precision-roasted, high-altitude single origin coffee delivered with flawless logistics.',
    keywords: ["premium coffee", "specialty cafe", "high-performance espresso", "daily grind cafe"]
  });

  return (
    <main>
      <Hero />
      <Philosophy />
      <Ritual />
      <Experience />
      <Reviews />
    </main>
  );
};

export default Home;
