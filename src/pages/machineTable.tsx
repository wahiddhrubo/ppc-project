import axios from "axios";
import { useEffect, useState } from "react";
import { MAINTANANCE_MACHINE_URL } from "../utils/urls";
import { MachineTableAlignments, MaintanaceMachine } from "../types/machines";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { MdModeEdit, MdOutlineZoomOutMap } from "react-icons/md";
import { IoTrashSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import ClockLoader from "react-spinners/ClockLoader";
import TableHeaderWithFilter from "../components/machineTable/header";

export default function MachineTable() {
  const [loading, setLoading] = useState(false);
  const [alignments, setAlignments] = useState<Array<MachineTableAlignments>>(
    []
  );
  const [uniquesCategory, setUniquesCategory] = useState<string[]>([]);
  const [uniquesType, setUniquesType] = useState<string[]>([]);
  const [uniquesBrand, setUniquesBrand] = useState<string[]>([]);
  const [uniquesSupplier, setUniquesSupplier] = useState<string[]>([]);
  const columnHelper = createColumnHelper<MaintanaceMachine>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const columns = [
    columnHelper.accessor("machine_id", {
      cell: () => (
        <span className="flex gap-1 text-[18px]">
          <MdModeEdit />
          <IoTrashSharp />
          <MdOutlineZoomOutMap />
        </span>
      ),
      header: () => <span className="text-black ">Actions</span>,

      id: "action",
      enableHiding: false,
      enableSorting: false,
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          dataType="category"
          id="category"
          setAllignment={setAlignments}
          title="M/c Category"
          uniques={uniquesCategory}
        />
      ),

      id: "category",
    }),
    columnHelper.accessor("type", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="M/c Type"
          dataType="category"
          id="type"
          setAllignment={setAlignments}
          uniques={uniquesType}
        />
      ),
      id: "type",
    }),
    columnHelper.accessor("machine_id", {
      cell: (info) => info.getValue().replace(/^(\w)[a-zA-Z]*(-\d+)/, "$1$2"),
      id: "id",
      header: () => (
        <TableHeaderWithFilter
          title="ID"
          dataType="number"
          id="id"
          setAllignment={setAlignments}
        />
      ),
      enableHiding: false,
      enableSorting: false,
    }),
    columnHelper.accessor("brand", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Brand"
          id="Brand"
          dataType="category"
          setAllignment={setAlignments}
          uniques={uniquesBrand}
        />
      ),
      id: "brand",
    }),
    columnHelper.accessor("model_number", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Model"
          id="model"
          dataType="string"
          setAllignment={setAlignments}
        />
      ),
      id: "model",
    }),
    columnHelper.accessor("serial_no", {
      cell: (info) => info.getValue().replace(/^[A-Z]+-/, ""),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Serial"
          id="serial"
          dataType="number"
          setAllignment={setAlignments}
        />
      ),
      id: "serial",
    }),
    columnHelper.accessor("floor_no", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Floor"
          id="floor"
          dataType="number"
          setAllignment={setAlignments}
        />
      ),
      id: "floor",
    }),
    columnHelper.accessor("line_no", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Line"
          id="line"
          dataType="number"
          setAllignment={setAlignments}
        />
      ),
      id: "line",
    }),
    columnHelper.accessor("supplier", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Supplier"
          id="supplier"
          dataType="category"
          setAllignment={setAlignments}
          uniques={uniquesSupplier}
        />
      ),
      id: "supplier",
    }),
    columnHelper.accessor("purchase_date", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => (
        <TableHeaderWithFilter
          title="Purchase Date"
          id="purchase Date"
          dataType="date"
          setAllignment={setAlignments}
        />
      ),

      id: "purchase date",
    }),
    columnHelper.accessor("machine_id", {
      cell: (info) => info.getValue(),
      enableHiding: true,
      enableSorting: true,
      header: () => <span className="text-black ">Qr Code</span>,
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
  const col_ids = table.getAllColumns().map((col) => col.id);
  useEffect(() => {
    if (col_ids) {
      const newAlignments: MachineTableAlignments[] = col_ids.map((id) => ({
        id,
        alignment: "center",
      }));

      setAlignments(newAlignments);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response }: { data: MaintanaceMachine[] } =
          await axios.get(MAINTANANCE_MACHINE_URL);
        const mcats = response.map((data) => data.category.toLowerCase());
        const mbrands = response.map((data) => data.brand.toLowerCase());
        const msuppliers = response.map((data) => data.supplier.toLowerCase());
        const mtypes = response.map((data) => data.type.toLowerCase());
        setUniquesBrand([...new Set(mbrands)]);
        setUniquesCategory([...new Set(mcats)]);
        setUniquesSupplier([...new Set(msuppliers)]);
        setUniquesType([...new Set(mtypes)]);
        setMachines([...new Set(response)]);
      } catch (error) {
        //   console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(alignments);
  return (
    <>
      {!loading ? (
        <div className="">
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
                      <TableHead
                        style={{
                          textAlign:
                            alignments.find(
                              (alignment) => alignment.id === header.id
                            )?.alignment || "left",
                        }}
                        key={header.id}
                        className="px-3 py-2"
                      >
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
                      <TableCell
                        style={{
                          textAlign:
                            alignments.find(
                              (alignment) => alignment.id === cell.id
                            )?.alignment || "left",
                        }}
                        key={cell.id}
                        className="px-3 py-2 "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
      ) : (
        <div className="w-screen items-center fixed inset-0 bg-white z-10  top-0 h-screen flex justify-center content-center">
          <ClockLoader size={80} />
        </div>
      )}
    </>
  );
}
