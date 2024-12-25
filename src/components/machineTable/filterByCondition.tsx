import { Dispatch, SetStateAction, useState } from "react";
import {
  FilterCondition,
  FilterConditionNumberType,
} from "../../types/machines";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { Minus, Plus } from "lucide-react";
import {
  FilterConditionNumbers,
  FilterConditionStrings,
  FilterValueNumbers,
} from "../../utils/machineTableUtils";

export default function FilterByCondition({
  filterConditions,
  dataType,
  filterOperator,
  setFilterConditions,
  setFilterOperator,
}: {
  setFilterConditions: Dispatch<SetStateAction<Array<FilterCondition>>>;
  setFilterOperator: Dispatch<SetStateAction<"And" | "Or">>;
  filterOperator: "And" | "Or";
  dataType: "string" | "number";
  filterConditions: FilterCondition[];
}) {
  const [showcondition, setShowcondition] = useState(false);
  const updateFilterValue = (id: string, value: string) => {
    setFilterConditions((prev) =>
      prev.map((p) => (p.id == id ? { ...p, value } : p))
    );
  };
  const updateFilter = (id: string, condition: FilterConditionNumberType) => {
    setFilterConditions((prev) =>
      prev.map((p) => (p.id == id ? { ...p, condition } : p))
    );
  };
  const filters =
    dataType == "number" ? FilterConditionNumbers : FilterConditionStrings;

  const addFilter = (
    id: string,
    condition: FilterConditionNumberType,
    value: string
  ) => {
    setFilterConditions((prev) => [
      ...prev,
      {
        condition,
        id,
        type: dataType,
        value: value,
      },
    ]);
  };
  //   console.log(fil && !FilterValueNumbers.includes(filterConditions[0].condition));
  return (
    <div className="relative text-sm text-left flex-col flex">
      <div
        onClick={() => setShowcondition((prev) => !prev)}
        className="px-2 items-center flex cursor-pointer justify-between font-semibold my-2  text-[14px]"
      >
        Filter by Condition
        {showcondition ? <Minus size={18} /> : <Plus size={18} />}
      </div>
      {showcondition && (
        <div className="">
          <Select
            onValueChange={(value: FilterConditionNumberType) => {
              filterConditions.length
                ? updateFilter("0", value)
                : addFilter("0", value, "");
            }}
          >
            <SelectTrigger className="capitalize my-2 border-black p-2 mb-4 text-black  border-2 ">
              {filterConditions.length > 0
                ? filterConditions[0].condition
                : "Select Condition"}
            </SelectTrigger>
            <SelectContent
              align="end"
              className="w-48 text-left z-20 border-2 border-black bg-white "
            >
              <SelectGroup>
                <SelectLabel>None</SelectLabel>
                {filters.map((filter) => (
                  <SelectItem
                    className="p-2 cursor-pointer text-sm capitalize hover:bg-black hover:border-0  hover:text-white "
                    value={filter.toString()}
                    key={filter}

                    // onClick={() => updateAlignment(align, setAllignment, id)}
                  >
                    {filter}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            onChange={(e) => {
              updateFilterValue("0", e.target.value);
            }}
            disabled={
              filterConditions.length == 0 ||
              !FilterValueNumbers.includes(filterConditions[0]?.condition)
            }
            className="w-full border-2 disabled:border-gray-400 border-black bg-transparent p-2 rounded-sm focus-within:outline-none"
          />
        </div>
      )}
      {filterConditions.length > 0 && showcondition && (
        <div>
          <div className="flex gap-4 font-semibold items-center my-2">
            <div
              onClick={() => setFilterOperator("Or")}
              className="flex cursor-pointer items-center gap-2"
            >
              <div
                style={{
                  borderColor: filterOperator == "Or" ? "lightblue" : "black",
                }}
                className="w-4 h-4 flex border-2 border-black rounded-full justify-center items-center"
              >
                <div
                  style={{
                    backgroundColor:
                      filterOperator == "Or" ? "#60a5fa" : "black",
                  }}
                  className="w-[6px] h-[6px] bg-blue-400 rounded-full"
                ></div>
              </div>
              Or
            </div>
            <div
              onClick={() => setFilterOperator("And")}
              className="flex items-center cursor-pointer gap-2"
            >
              <div
                style={{
                  borderColor: filterOperator == "And" ? "#60a5fa" : "black",
                }}
                className="w-4 h-4 flex border-2 border-black rounded-full justify-center items-center"
              >
                <div
                  style={{
                    backgroundColor:
                      filterOperator == "And" ? "#60a5fa" : "black",
                  }}
                  className="w-[6px] h-[6px] bg-black rounded-full"
                ></div>
              </div>
              And
            </div>
          </div>
          <div className="">
            <Select
              onValueChange={(value: FilterConditionNumberType) => {
                filterConditions.length > 1
                  ? updateFilter("1", value)
                  : addFilter("1", value, "");
              }}
            >
              <SelectTrigger className="outline-none capitalize p-2 mb-4 text-black  border-2 border-black my-4 rounded-sm ">
                {filterConditions.length > 1
                  ? filterConditions[1].condition
                  : "Select Condition"}
              </SelectTrigger>
              <SelectContent
                align="end"
                className="w-48 text-left z-20 border-2 border-black bg-white "
              >
                <SelectGroup>
                  <SelectLabel>None</SelectLabel>
                  {filters.map((filter) => (
                    <SelectItem
                      className="p-2 cursor-pointer text-sm capitalize hover:bg-black hover:border-0  hover:text-white "
                      value={filter.toString()}
                      key={filter}

                      // onClick={() => updateAlignment(align, setAllignment, id)}
                    >
                      {filter}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <input
              onChange={(e) => {
                updateFilterValue("1", e.target.value);
              }}
              disabled={
                filterConditions.length < 2 ||
                !FilterValueNumbers.includes(filterConditions[1]?.condition)
              }
              className="w-full border-2 disabled:border-gray-400 border-black bg-transparent p-2 rounded-sm focus-within:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
