import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

export default function FilterByValue({
  searchedUniques,
  filterUniques,
  setFilterUniques,
  setFilterValue,
}: {
  searchedUniques: string[];
  setFilterUniques: Dispatch<SetStateAction<string[]>>;
  setFilterValue: Dispatch<SetStateAction<string>>;
  filterUniques: string[];
}) {
  const [showFilterValue, setShowFilterValue] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowFilterValue((prev) => !prev)}
        className="px-2 w-full items-center flex cursor-pointer justify-between font-semibold my-2  text-[14px]"
      >
        Filter by Value
        {showFilterValue ? <Minus size={18} /> : <Plus size={18} />}
      </div>
      {showFilterValue && (
        <div>
          <input
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full border-2 text-sm border-black bg-transparent p-2 rounded-sm focus-within:outline-none"
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
