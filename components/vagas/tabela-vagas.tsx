"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const data: Vaga[] = [
  {
    id: "vaga01",
    titulo: "Desenvolvedor Front-end",
    departamento: "Tecnologia",
    localizacao: "São Paulo - SP",
    status: "aberta",
    responsavel: "ken99@example.com",
  },
  {
    id: "vaga02",
    titulo: "Analista de Marketing Digital",
    departamento: "Marketing",
    localizacao: "Rio de Janeiro - RJ",
    status: "em andamento",
    responsavel: "Abe45@example.com",
  },
  {
    id: "vaga03",
    titulo: "Assistente de RH",
    departamento: "Recursos Humanos",
    localizacao: "Belo Horizonte - MG",
    status: "fechada",
    responsavel: "Monserrat44@example.com",
  },
  {
    id: "vaga04",
    titulo: "Engenheiro de Dados",
    departamento: "Tecnologia",
    localizacao: "Remoto",
    status: "aberta",
    responsavel: "Silas22@example.com",
  },
  {
    id: "vaga05",
    titulo: "Designer UI/UX",
    departamento: "Design",
    localizacao: "Curitiba - PR",
    status: "fechada",
    responsavel: "carmella@example.com",
  },
];

type Vaga = {
  id: string;
  titulo: string;
  departamento: string;
  localizacao: string;
  status: "aberta" | "fechada" | "em andamento";
  responsavel: string;
};
export const columns: ColumnDef<Vaga>[] = [
  {
    accessorKey: "titulo",
    header: "Descrição",
  },
  {
    accessorKey: "departamento",
    header: "Departamento",
  },
  {
    accessorKey: "localizacao",
    header: "Localização",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      let colorClass = "";
      switch (status) {
        case "aberta":
          colorClass = "text-green-600 font-semibold";
          break;
        case "fechada":
          colorClass = "text-red-600 font-semibold";
          break;
        case "em andamento":
          colorClass = "text-yellow-600 font-semibold";
          break;
      }

      return <span className={colorClass}>{status}</span>;
    },
  },
  {
    accessorKey: "responsavel",
    header: "Responsável",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vagas = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(vagas.id)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>apagar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableVagas() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar Vagas"
          value={(table.getColumn("titulo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("titulo")?.setFilterValue(event.target.value)
          }
          className="max-w-md"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href={"/dashboard/vaga/nova-vaga"}
          className="
          
          text-white bg-rose-600 hover:bg-rose-600/90 focus:right-4
          focus:outline-none
          focus:ring-rose-6  font-medium rounded-lg
          text-base px-5 py-3 text-center
           inline-flex items-center dark:focus:ring-rose-6bg-lime-600/55 me-2 mb-2
        
        "
        >
          <Plus />
          <span>Nova Vaga</span>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} linha(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Proximo
          </Button>
        </div>
      </div>
    </div>
  );
}
