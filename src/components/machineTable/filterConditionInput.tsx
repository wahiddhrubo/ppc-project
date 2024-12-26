import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import {
  FilterCondition,
  FilterConditionNumberType,
  FilterConditionStringType,
  FilterConditionTypeDate,
} from "../../types/machines";
import {
  FilterConditionDates,
  FilterConditionNumbers,
  FilterConditionStrings,
  FiltersConditionList,
} from "../../utils/machineTableUtils";

export default function FilterConditionInput({
  filterConditions,
  dataType,
  setFilterConditions,
  id,
}: {
  setFilterConditions: Dispatch<SetStateAction<Array<FilterCondition>>>;
  dataType: "string" | "number" | "category" | "date";
  filterConditions: FilterCondition[];
  id: number;
}) {
  const filters =
    dataType == "string"
      ? FilterConditionStrings
      : dataType == "date"
      ? FilterConditionDates
      : dataType == "number"
      ? FilterConditionNumbers
      : [];
  const updateFilterValue = (id: string, value: string, pos: number) => {
    if (pos == 0) {
      setFilterConditions((prev) =>
        prev.map((p) => (p.id == id ? { ...p, value } : p))
      );
    } else if (pos === 1) {
      setFilterConditions((prev) =>
        prev.map((p) => (p.id == id ? { ...p, value2: value } : p))
      );
    }
  };

  const addFilter = (
    id: string,
    condition:
      | FilterConditionNumberType
      | FilterConditionStringType
      | FilterConditionTypeDate,
    value: string,
    value2: string
  ) => {
    console.log(id, "add");
    if (dataType !== "category") {
      setFilterConditions((prev) => [
        ...prev,
        {
          id,
          condition,
          value,
          type: dataType,
          value2,
        },
      ]);
    } else {
      setFilterConditions((prev) => [
        ...prev,
        {
          id,
          condition,
          value,
          type: "string",
          value2,
        },
      ]);
    }
  };
  const updateFilter = (id: string, condition: FilterConditionNumberType) => {
    console.log(id);

    setFilterConditions((prev) =>
      prev.map((p) => (p.id == id.toString() ? { ...p, condition } : p))
    );
  };
  return (
    <>
      {filterConditions.length > id - 1 && (
        <div className="">
          <Select
            onValueChange={(value: FilterConditionNumberType) => {
              filterConditions.length === id + 1
                ? updateFilter(id.toString(), value)
                : addFilter(id.toString(), value, "", "");
            }}
          >
            <SelectTrigger className="capitalize text-[14px] focus-within:border-0 !focus:shadow-transparent focus-visible:border-0  my-2 bg-gray-100 p-4 mb-4 text-black  border-1 ">
              {filterConditions.length > id
                ? filterConditions[id].condition
                : "Select Condition"}
            </SelectTrigger>
            <SelectContent
              align="end"
              className="w-48 text-left text-[14px] z-20 border-2 border-black bg-white "
            >
              <SelectGroup>
                <SelectLabel>None</SelectLabel>
                {filters.map((filter) => (
                  <SelectItem
                    className="p-2 text-[14px] cursor-pointer text-sm capitalize hover:bg-black hover:border-0  hover:text-white "
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
              updateFilterValue(id.toString(), e.target.value, 0);
            }}
            disabled={
              filterConditions.length == id ||
              !FiltersConditionList.includes(filterConditions[id]?.condition)
            }
            placeholder="Value"
            className="w-full text-[14px] border-2 border-gray-400  bg-transparent p-2 rounded-sm focus-within:outline-none"
          />

          {filterConditions[id]?.condition.toLowerCase().match("range") && (
            <input
              onChange={(e) => {
                updateFilterValue(id.toString(), e.target.value, 1);
              }}
              disabled={
                filterConditions.length == 0 ||
                !FiltersConditionList.includes(filterConditions[id]?.condition)
              }
              placeholder="Second Value"
              className="w-full text-[14px] border-2 my-2 border-gray-400  bg-transparent p-2 rounded-sm focus-within:outline-none"
            />
          )}
        </div>
      )}
    </>
  );
}
