'use client';
import "./HomeCss.css"
import HeroSection from "./HomeSection/HeroSection";
import PartnerSection from "./HomeSection/PartnerSection";
import TheShifSection from "./HomeSection/TheShifSection";
import ThreePillarsSection from "./HomeSection/ThreePillarsSection";
import CreativeFutureSection from "./HomeSection/CreativeFutureSection";
import BrandsSection from "./HomeSection/BrandsSection";
import OutlinedBandSection from "./HomeSection/OutlinedBandSection";
import BlogSection from "./HomeSection/BlogSection";
import TestimonialsSection from "./HomeSection/TestimonialsSection";
import TalkDiscoverySection from "./HomeSection/TalkDiscoverySection";

export default function HomePage() {
  return (
    <>
      <HeroSection/>
      <PartnerSection/>
      <TheShifSection/>
      <ThreePillarsSection/>
      <CreativeFutureSection/>
      <BrandsSection/>
      <OutlinedBandSection/>
      <BlogSection/>
      <TestimonialsSection/>
      <TalkDiscoverySection/>
    </>
  );
}
