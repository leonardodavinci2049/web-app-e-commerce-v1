import MainHeader from "@/components/header/main-header";
import MobileHeader from "@/components/header/mobile-header";

const CatalogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MobileHeader />
      <MainHeader />
      {children}
    </>
  );
};

export default CatalogLayout;
