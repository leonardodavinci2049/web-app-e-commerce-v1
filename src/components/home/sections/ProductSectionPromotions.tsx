import { getPromotionSectionProducts } from "@/app/home/actions";
import { envs } from "@/core/config/envs";
import ProductsSection from "./products-section";

export default async function ProductSectionPromotions() {
  const products = await getPromotionSectionProducts();

  return (
    <ProductsSection
      id="home-produtos-promocoes"
      title={envs.HOME_SECTION_2_TITLE}
      products={products}
      emptyMessage="Nenhum produto em promocao encontrado no momento."
    />
  );
}
