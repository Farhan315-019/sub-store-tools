import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { PopularProducts } from "@/components/home/PopularProducts";
import { BrowseProducts } from "@/components/home/BrowseProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ResellerCTA } from "@/components/home/ResellerCTA";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryExplorer />
      <PopularProducts />
      <BrowseProducts limit={8} />
      <WhyChooseUs />
      <HowItWorks />
      <ResellerCTA />
      <SpecialOffers />
      <Testimonials />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
