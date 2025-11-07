import TableMainHeader from "./tabela/components/header/main-header";
import TableMobileHeader from "./tabela/components/header/mobile-header";

const TableLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <TableMobileHeader />
      <TableMainHeader />
      {children}
    </>
  );
};

export default TableLayout;
