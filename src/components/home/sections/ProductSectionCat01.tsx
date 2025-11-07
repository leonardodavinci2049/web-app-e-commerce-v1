import { getCategoryOneSectionProducts } from "@/app/(home)/actions";
import { envs } from "@/core/config/envs";
import ProductsSection from "./products-section";

export default async function ProductSectionCat01() {
  const products = await getCategoryOneSectionProducts();

  return (
    <ProductsSection
      id="home-produtos-categoria-1"
      title={envs.HOME_SECTION_4_TITLE}
      products={products}
      emptyMessage="Nenhum produto encontrado para esta categoria."
    />
  );
}
