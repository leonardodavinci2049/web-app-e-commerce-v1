/**
 * Homepage - E-commerce B2B CAIXAFECHADA
 * Complete homepage with all sections in the correct order
 */


import AboutSection from "@/components/home/about-section";
import Advantages from "@/components/home/advantages";
import CustomerSegments from "@/components/home/customer-segments";
import DepartmentsNav from "@/components/home/departments-nav";
import Footer from "@/components/home/footer";
import HeroSlider from "@/components/home/hero-slider";

import LocationSection from "@/components/home/location-section";
import MainHeader from "@/components/home/main-header";
import MobileBottomNav from "@/components/home/mobile-bottom-nav";
import NavigationMenu from "@/components/home/navigation-menu";
import Newsletter from "@/components/home/newsletter";

import PromoBanner from "@/components/home/promo-banner";
import PromoBannersGrid from "@/components/home/promo-banners-grid";
import ProductsSection from "@/components/home/sections/products-section";

// Import mock data
import { benchProducts, featuredProducts, newProducts } from "@/data/mock-data";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Top Bar */}
      {/* <TopBar /> */}

      {/* 2. Main Header */}
      <MainHeader />

      {/* 3. Navigation Menu */}
      <NavigationMenu />

      {/* Main Content */}
      <main className="flex-1">
        {/* 4. Hero Slider */}
        <HeroSlider />

        {/* 5. Departments Navigation */}
        <DepartmentsNav />

        {/* 6. Featured Products Section */}
        <ProductsSection
          id="produtos-mais-procurados"
          title="Produtos mais procurados"
          subtitle="As melhores ofertas para você"
          products={featuredProducts}
        />

        {/* 7. Promo Banner - Novidades */}
        <PromoBanner />

        {/* 8. New Products Section */}
        <ProductsSection
          id="produtos-em-destaque"
          title="Produtos em destaque"
          subtitle="Lançamentos e novidades"
          products={newProducts}
        />

        {/* 9. Bench Products Section - Specific Category */}
        <ProductsSection
          id="ferramentas-de-bancada"
          title="Ferramentas de bancada para sua loja!"
          subtitle="Equipamentos profissionais de alta qualidade"
          products={benchProducts}
        />

        {/* 10. Promotional Banners Grid */}
        <PromoBannersGrid />

        {/* 11. Customer Segments / Testimonials */}
        <CustomerSegments />

        {/* 12. Advantages Section */}
        <Advantages />

        {/* 13. About Section */}
        <AboutSection />

        {/* 14. Location Section */}
        <LocationSection />

        {/* 15. Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <MobileBottomNav />
    </div>
  );
}
