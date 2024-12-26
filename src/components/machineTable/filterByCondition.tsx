import { Dispatch, SetStateAction } from "react";
import { FilterCondition } from "../../types/machines";

import FilterConditionInput from "./filterConditionInput";

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
  dataType: "string" | "number" | "category" | "date";
  filterConditions: FilterCondition[];
}) {
  //   console.log(fil && !FilterValueNumbers.includes(filterConditions[0].condition));
  return (
    <div className="relative text-sm text-left flex-col flex">
      <div className="px-2 items-center flex cursor-pointer justify-between  my-2  text-[12px]">
        Filter by Condition
      </div>
      <FilterConditionInput
        filterConditions={filterConditions}
        id={0}
        setFilterConditions={setFilterConditions}
        key={0}
        dataType={dataType}
      />

      {filterConditions.length > 0 && (
        <div>
          <div className="flex gap-4 font-semibold items-center my-4">
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
          <FilterConditionInput
            filterConditions={filterConditions}
            id={1}
            setFilterConditions={setFilterConditions}
            key={1}
            dataType={dataType}
          />
        </div>
      )}
    </div>
  );
}
