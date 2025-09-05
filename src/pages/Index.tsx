// Index.tsx
import { useState } from 'react';
import { StarCounter } from '@/components/StarCounter';
import AboutUs from '@/components/AboutUs';
import { StarStories } from '@/components/StarStories';
import { Navbar } from '@/components/Navbar';

function Index() {
  const [activePage, setActivePage] =
    useState<'home' | 'about' | 'stories'>('home');

  return (
    <div className="App min-h-screen">
      {/* ✅ Navbar always visible */}
      <Navbar setActivePage={setActivePage} />

      {/* ✅ Render pages conditionally */}
      {activePage === 'home' && <StarCounter setActivePage={setActivePage} />}
      {activePage === 'about' && <AboutUs setActivePage={setActivePage} />}
      {activePage === 'stories' && <StarStories setActivePage={setActivePage} />}
    </div>
  );
}

export default Index;
