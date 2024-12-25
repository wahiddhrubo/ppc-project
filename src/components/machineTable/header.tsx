import { Dispatch, SetStateAction, useState } from "react";
import {
  FilterCondition,
  MachineSearchFilters,
  MachineTableAlignments,
} from "../../types/machines";
import { updateAlignment } from "../../utils/machineTableUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FilterIcon } from "lucide-react";
import { Select, SelectTrigger } from "../ui/select";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { ScrollArea } from "../ui/scroll-area";
import { useSearchParams } from "react-router-dom";
import FilterByValue from "./filterByValue";
import FilterByCondition from "./filterByCondition";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function TableHeaderWithFilter({
  title,
  setAllignment,
  id,
  dataType = "string",
  uniques = [],
}: {
  title: string;
  id: string;
  setAllignment: Dispatch<SetStateAction<MachineTableAlignments[]>>;
  dataType: "string" | "number";
  uniques?: string[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState("");
  const [filterUniques, setFilterUniques] = useState<string[]>([]);
  const [filterConditions, setFilterConditions] = useState<
    Array<FilterCondition>
  >([]);

  const searchedUniques =
    uniques.filter((u) => u.toLowerCase().includes(filterValue)) || uniques;
  const [filterOperator, setFilterOperator] = useState<"And" | "Or">("Or");

  const aligns: Array<"left" | "center" | "right"> = [
    "left",
    "center",
    "right",
  ];

  const filterHandler = () => {
    const filters: MachineSearchFilters[] = JSON.parse(
      atob(searchParams.get("filters") || "") || "[]"
    );

    console.log(filters);
    const match = filters.find((filter) => filter.category == id);
    if (match) {
      const newFilter = filters.map((filter) =>
        filter.category == id
          ? {
              ...filter,
              filterValue,
              filterConditions: {
                operator: filterOperator,
                conditions: filterConditions.map((f) => ({
                  condition: f.condition,
                  value: f.value,
                })),
              },
              filterUniques,
            }
          : filter
      );
      searchParams.set("filters", btoa(JSON.stringify(newFilter)));
      setSearchParams(searchParams);
    } else {
      filters.push({
        category: id,
        filterValue,
        filterUniques,
        filterConditions: {
          operator: filterOperator,
          conditions: filterConditions.map((f) => ({
            condition: f.condition,
            value: f.value,
          })),
        },
      });
      searchParams.set("filters", btoa(JSON.stringify(filters)));
      setSearchParams(searchParams);
    }
  };
  return (
    <div className="text-black flex gap-2 items-center  relative">
      <span className="text-black text-left">{title}</span>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <FilterIcon className="cursor-pointer" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white z-100 text-lg w-56 border-2 p-5 rounded-sm border-black"
          align="start"
        >
          <ScrollArea className="w-full  h-fit">
            <Select>
              <SelectTrigger className="outline-none p-2 text-black  border-[2px] rounded-sm border-black mb-2 focus:border-0">
                Alignment
              </SelectTrigger>
              <SelectContent className="w-48 text-left z-20 border-2 border-black bg-white ">
                {aligns.map((align, index) => (
                  <SelectItem
                    key={index}
                    className="p-2 text-sm capitalize hover:bg-black hover:border-0  hover:text-white "
                    value="center"
                    onClick={() => updateAlignment(align, setAllignment, id)}
                  >
                    {align}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FilterByCondition
              dataType={dataType}
              filterConditions={filterConditions}
              filterOperator={filterOperator}
              setFilterConditions={setFilterConditions}
              setFilterOperator={setFilterOperator}
            />

            <FilterByValue
              filterUniques={filterUniques}
              searchedUniques={searchedUniques}
              setFilterUniques={setFilterUniques}
              setFilterValue={setFilterValue}
            />
            <DropdownMenuItem className="w-full text-right">
              <button
                onClick={filterHandler}
                className="px-8 py-3 text-[14px] text-white rounded-sm my-2 bg-black ml-auto w-fit"
              >
                Filter
              </button>
            </DropdownMenuItem>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
