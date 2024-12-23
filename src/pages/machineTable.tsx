import axios from "axios";
import { useEffect, useState } from "react";
import { MAINTANANCE_MACHINE_URL } from "../utils/urls";
import { MaintanaceMachine } from "../types/machines";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  MdModeEdit,
  MdOutlineZoomOut,
  MdOutlineZoomOutMap,
} from "react-icons/md";
import { IoTrashSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";

export default function MachineTable() {
  const columnHelper = createColumnHelper<MaintanaceMachine>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const columns = [
    columnHelper.accessor("machine_id", {
      cell: (info) => (
        <span className="flex gap-1 text-[18px]">
          <MdModeEdit />
          <IoTrashSharp />
          <MdOutlineZoomOutMap />
        </span>
      ),
      header: () => <span className="text-black font-semibold">Action</span>,
      id: "action",
      enableHiding: false,
      enableSorting: false,
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <span className="text-black font-semibold">M/c Category</span>
      ),
      id: "category",
    }),
    columnHelper.accessor("type", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">M/c type</span>,
      id: "type",
    }),
    columnHelper.accessor("machine_id", {
      cell: (info) => info.getValue().replace(/^(\w)[a-zA-Z]*(-\d+)/, "$1$2"),
      id: "id",
      header: () => <span className="text-black font-semibold">ID</span>,
      enableHiding: false,
      enableSorting: false,
    }),
    columnHelper.accessor("brand", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">Brand</span>,
      id: "brand",
    }),
    columnHelper.accessor("model_number", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">Model</span>,
      id: "model",
    }),
    columnHelper.accessor("serial_no", {
      cell: (info) => info.getValue().replace(/^[A-Z]+-/, ""),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">Serial</span>,
      id: "serial",
    }),
    columnHelper.accessor("floor_no", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">Floor</span>,
      id: "floor",
    }),
    columnHelper.accessor("line_no", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">Line</span>,
      id: "line",
    }),
    columnHelper.accessor("supplier", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">Supplier</span>,
      id: "supplier",
    }),
    columnHelper.accessor("purchase_date", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <span className="text-black font-semibold">Purchase Date</span>
      ),
      id: "purchase date",
    }),
    columnHelper.accessor("machine_id", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black font-semibold">QR Code</span>,
      id: "qr code",
    }),
  ];
  const [machines, setMachines] = useState<Array<MaintanaceMachine>>([]);
  const table = useReactTable({
    data: machines,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  useEffect(() => {
    axios
      .get(MAINTANANCE_MACHINE_URL)
      .then((response) => {
        setMachines(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="py-20">
      <div className="px-10 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="ml-auto cursor-pointer border-2 rounded-md border-black w-fit flex bg-white p-2">
              Hide Columns <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer my-2"
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
      </div>
      <div className="px-10 py-10">
        <Table className="text-black border-2 text-left  ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-3 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-3 py-2 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} entries.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
