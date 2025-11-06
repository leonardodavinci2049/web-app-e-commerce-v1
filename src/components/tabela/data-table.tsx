/**
 * Products Data Table Component
 * Modern table implementation with sorting, pagination and loading states
 */

"use client";

import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  totalCount?: number;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  onLoadMore,
  hasMore = false,
  totalCount = 0,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 50, // Show more items per page for better UX
      },
    },
  });

  return (
    <div className={cn("space-y-4", className)}>
      {/* Table Container */}
      <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20 overflow-hidden">
        <div className="md:[&_div[data-slot='table-container']]:overflow-visible md:[&_div[data-slot='table-container']]:overflow-x-visible">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-blue-50 dark:bg-blue-950/50 border-b-2 border-blue-200 dark:border-blue-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-blue-800 dark:text-blue-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition-colors border-b border-blue-100 dark:border-blue-900/50"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isProductColumn = cell.column.id === "PRODUTO";

                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "py-2 sm:py-4 px-2 sm:px-4",
                            isProductColumn
                              ? "sm:whitespace-normal align-top min-w-0"
                              : undefined,
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Carregando produtos...</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          Nenhum produto encontrado.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Tente ajustar os filtros ou o termo de busca.
                        </p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Loading overlay for when loading more data */}
        {loading && data.length > 0 && (
          <div className="border-t border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 p-4">
            <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Carregando mais produtos...</span>
            </div>
          </div>
        )}
      </div>

      {/* Table Info and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        {/* Results Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Mostrando {data.length} de{" "}
            {totalCount > 0 ? totalCount : data.length} produtos
          </span>
        </div>

        {/* Pagination and Load More */}
        <div className="flex items-center gap-2">
          {/* Table Pagination Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="hidden sm:flex"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="text-sm text-muted-foreground">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="hidden sm:flex"
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Load More Button */}
          {hasMore && onLoadMore && (
            <Button
              onClick={onLoadMore}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border-blue-600 dark:border-blue-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Carregando...
                </>
              ) : (
                "CARREGAR MAIS"
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className="flex sm:hidden items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground px-4">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
