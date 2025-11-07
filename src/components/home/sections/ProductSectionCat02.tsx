import { getCategoryTwoSectionProducts } from "@/app/(home)/actions";
import { envs } from "@/core/config/envs";
import ProductsSection from "./products-section";

export default async function ProductSectionCat02() {
  const products = await getCategoryTwoSectionProducts();

  return (
    <ProductsSection
      id="home-produtos-categoria-2"
      title={envs.HOME_SECTION_5_TITLE}
      products={products}
      emptyMessage="Nenhum produto encontrado para esta categoria."
    />
  );
}
