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
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto sm:overflow-x-visible">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
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
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-2 sm:py-4 px-2 sm:px-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
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
          <div className="border-t bg-muted/20 p-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
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
              className="bg-primary hover:bg-primary/90"
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
