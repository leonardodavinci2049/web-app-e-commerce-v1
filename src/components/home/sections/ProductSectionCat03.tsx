import { getCategoryThreeSectionProducts } from "@/app/home/actions";
import { envs } from "@/core/config/envs";
import ProductsSection from "./products-section";

export default async function ProductSectionCat03() {
  const products = await getCategoryThreeSectionProducts();

  return (
    <ProductsSection
      id="home-produtos-categoria-3"
      title={envs.HOME_SECTION_6_TITLE}
      products={products}
      emptyMessage="Nenhum produto encontrado para esta categoria."
    />
  );
}
