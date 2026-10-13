import DiscoveryHeroSection from "./DiscoverySection/DiscoveryHeroSection";
import DiscoveryODShiftSection from "./DiscoverySection/DiscoveryODShiftSection";
import DiscoveryIntersectionObserver from "./DiscoverySection/DiscoveryIntersectionObserver";
import Discoverycasestudiesection from "./DiscoverySection/Discoverycasestudiesection"
import DiscoveryOdwedontSection from "./DiscoverySection/DiscoveryOdwedontSection";
import DiscoveryHowItWorksSection from "./DiscoverySection/DiscoveryHowItWorksSection";
import DiscoveryODAISection from "./DiscoverySection/DiscoveryODAISection";
import DiscoveryODConsistencySection from "./DiscoverySection/DiscoveryODConsistencySection";
import DiscoveryHowWeThinkOrganic from "./DiscoverySection/DiscoveryHowWeThinkOrganic";
import DiscoverydctaSection from "./DiscoverySection/DiscoverydctaSection";

// Built-in layout, rendered by app/discovery/page.jsx only when Strapi has no
// published Discovery page (or is unreachable). Every section falls back to
// its own built-in copy when given no props.
export default function Discovery() {
  return (
    <>
      <DiscoveryHeroSection />
      <DiscoveryODShiftSection />
      <DiscoveryOdwedontSection />
      <DiscoveryHowItWorksSection />
      <DiscoveryIntersectionObserver />
      <Discoverycasestudiesection />
      <DiscoveryODAISection />
      <DiscoveryODConsistencySection />
      <DiscoveryHowWeThinkOrganic />
      <DiscoverydctaSection />
    </>
  );
}
