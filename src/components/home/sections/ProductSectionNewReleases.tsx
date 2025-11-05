import { getNewReleasesSectionProducts } from "@/app/home/actions";
import { envs } from "@/core/config/envs";
import ProductsSection from "./products-section";

export default async function ProductSectionNewReleases() {
  const products = await getNewReleasesSectionProducts();

  return (
    <ProductsSection
      id="home-produtos-novidades"
      title={envs.HOME_SECTION_3_TITLE}
      products={products}
      emptyMessage="Nenhuma novidade disponivel no momento."
    />
  );
}
