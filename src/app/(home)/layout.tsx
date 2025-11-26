import TableMainHeader from "./components/header/main-header";
import TableMobileHeader from "./components/header/mobile-header";
import { TableSearchProvider } from "./components/table/table-search-context";

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
