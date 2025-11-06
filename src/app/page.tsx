/**
 * Homepage - E-commerce B2B CAIXAFECHADA
 * Complete homepage with all sections in the correct order
 */

import { Suspense } from "react";
import MainHeader from "@/components/header/main-header";
import MobileHeader from "@/components/header/mobile-header";
import AboutSection from "@/components/home/about-section";
import Advantages from "@/components/home/advantages";
import CustomerSegments from "@/components/home/customer-segments";
import DepartmentsNav from "@/components/home/departments-nav";
import Footer from "@/components/home/footer";
import HeroSlider from "@/components/home/hero-slider";
import LocationSection from "@/components/home/location-section";
import MobileBottomNav from "@/components/home/mobile-bottom-nav";
import Newsletter from "@/components/home/newsletter";
import PromoBanner from "@/components/home/promo-banner";
import PromoBannersGrid from "@/components/home/promo-banners-grid";
import ProductSectionCat01 from "@/components/home/sections/ProductSectionCat01";
import ProductSectionCat02 from "@/components/home/sections/ProductSectionCat02";
import ProductSectionCat03 from "@/components/home/sections/ProductSectionCat03";
import ProductSectionHighlights from "@/components/home/sections/ProductSectionHighlights";
import ProductSectionNewReleases from "@/components/home/sections/ProductSectionNewReleases";
import ProductSectionPromotions from "@/components/home/sections/ProductSectionPromotions";
import ProductsSection from "@/components/home/sections/products-section";
import { envs } from "@/core/config/envs";

export default function HomePage() {
  const renderLoadingSection = (id: string, title: string) => (
    <ProductsSection id={id} title={title} isLoading />
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Top Bar */}
      {/* <TopBar /> */}

      {/* 2. Mobile Header */}
      <MobileHeader />

      {/* 2. Main Header */}
      <MainHeader />

      {/* 3. Navigation Menu */}
      {/* <NavigationMenu /> */}

      {/* Main Content */}
      <main className="flex-1">
        {/* 4. Hero Slider */}
        <HeroSlider />

        {/* 5. Departments Navigation */}
        <DepartmentsNav />

        {/* 6. Featured Products Section */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-destaque",
            envs.HOME_SECTION_1_TITLE,
          )}
        >
          <ProductSectionHighlights />
        </Suspense>

        {/* 7. Promo Banner - Novidades */}
        <PromoBanner />

        {/* 8. New Products Section */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-promocoes",
            envs.HOME_SECTION_2_TITLE,
          )}
        >
          <ProductSectionPromotions />
        </Suspense>

        {/* 9. New Releases Section */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-novidades",
            envs.HOME_SECTION_3_TITLE,
          )}
        >
          <ProductSectionNewReleases />
        </Suspense>

        {/* 10. Promotional Banners Grid */}
        <PromoBannersGrid />

        {/* 11. Category Sections */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-1",
            envs.HOME_SECTION_4_TITLE,
          )}
        >
          <ProductSectionCat01 />
        </Suspense>

        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-2",
            envs.HOME_SECTION_5_TITLE,
          )}
        >
          <ProductSectionCat02 />
        </Suspense>

        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-3",
            envs.HOME_SECTION_6_TITLE,
          )}
        >
          <ProductSectionCat03 />
        </Suspense>

        {/* 12. Customer Segments / Testimonials */}
        <CustomerSegments />

        {/* 13. Advantages Section */}
        <Advantages />

        {/* 14. About Section */}
        <AboutSection />

        {/* 15. Location Section */}
        <LocationSection />

        {/* 16. Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <MobileBottomNav />
    </div>
  );
}
