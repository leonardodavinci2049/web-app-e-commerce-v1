import { getHighlightSectionProducts } from "@/app/home-desabled/actions";
import { envs } from "@/core/config/envs";
import ProductsSection from "./products-section";

export default async function ProductSectionHighlights() {
  const products = await getHighlightSectionProducts();

  return (
    <ProductsSection
      id="home-produtos-destaque"
      title={envs.HOME_SECTION_1_TITLE}
      products={products}
      emptyMessage="Nenhum produto em destaque disponivel no momento."
    />
  );
}
