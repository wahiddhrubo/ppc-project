import { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

export default function FilterByValue({
  dataType,
  searchedUniques,
  filterUniques,
  setFilterUniques,
  setFilterValue,
}: {
  searchedUniques: string[];
  setFilterUniques: Dispatch<SetStateAction<string[]>>;
  setFilterValue: Dispatch<SetStateAction<string>>;
  filterUniques: string[];
  dataType: "number" | "string" | "date" | "category";
}) {
  return (
    <>
      {dataType === "category" && (
        <div>
          <input
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full border-2 text-sm border-gray-400 mt-2 bg-transparent p-2 placeholder:text-gray-600 rounded-sm focus-within:outline-none"
            placeholder="Seach Category"
          />

          {searchedUniques.length > 0 && (
            <ScrollArea className="w-full text-left capitalize p-1 h-40">
              {searchedUniques.map((value, index) => (
                <>
                  <div
                    onClick={() => {
                      setFilterUniques((prev) =>
                        prev.includes(value)
                          ? prev.filter((e) => e !== value)
                          : [...prev, value]
                      );
                    }}
                    className="w-full h-full gap-2 z-20 py-4 cursor-pointer flex items-center justify-start"
                  >
                    <Checkbox
                      checked={filterUniques.includes(value)}
                      id={index.toString()}
                    />
                    <label
                      htmlFor={index.toString()}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value}
                    </label>
                  </div>
                  <hr className="w-full  block h-[2px] bg-gray-300" />
                </>
              ))}
            </ScrollArea>
          )}
        </div>
      )}
    </>
  );
}
