import TableMainHeader from "./tabela/components/header/main-header";
import TableMobileHeader from "./tabela/components/header/mobile-header";
import { TableSearchProvider } from "./tabela/components/table/table-search-context";

const TableLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TableSearchProvider>
      <TableMobileHeader />
      <TableMainHeader />
      {children}
    </TableSearchProvider>
  );
};

export default TableLayout;
