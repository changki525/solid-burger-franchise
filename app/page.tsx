import ScrollProgress from '@/components/ui/ScrollProgress';
import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import BrandStory from '@/components/sections/BrandStory';
import MenuShowcase from '@/components/sections/MenuShowcase';
import FranchiseSection from '@/components/sections/FranchiseSection';
import StoresSection from '@/components/sections/StoresSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main className="relative">
      {/* Global UI */}
      <ScrollProgress />
      <Navigation />

      {/* Page Sections */}
      <HeroSection />
      <BrandStory />
      <MenuShowcase />
      <FranchiseSection />
      <StoresSection />
      <FooterSection />
    </main>
  );
}
