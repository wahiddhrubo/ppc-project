import { Dispatch, SetStateAction } from "react";
import {
  FilterConditionNumberType,
  FilterConditionStringType,
  FilterConditionTypeDate,
  MachineTableAlignments,
} from "../types/machines";
// import { useSearchParams } from "react-router-dom";

export const FilterConditionStrings: FilterConditionStringType[] = [
  "Exact Match",
  "Contains",
  "Not Contains",
  "Starts With",
  "Ends With",
];
export const FilterConditionNumbers: FilterConditionNumberType[] = [
  "Exact Match",
  "Greater Than",
  "Less Than",
  "Range",
];
export const FilterValueNumbers: FilterConditionNumberType[] = [
  "Exact Match",
  "Greater Than",
  "Less Than",
  "Range",
];

export const updateAlignment = (
  newAllignment: "left" | "right" | "center",
  setAllignment: Dispatch<SetStateAction<MachineTableAlignments[]>>,
  id: string
) => {
  setAllignment((alignments) =>
    alignments.map((alignment) =>
      alignment.id === id
        ? { ...alignment, alignment: newAllignment }
        : alignment
    )
  );
};

export const FilterConditionDates: FilterConditionTypeDate[] = [
  "Exact Date",
  "Date Range",
  "Before",
  "After",
  "Yesterday",
  "Past 7 Days",
  "Last Month",
  "Last Year",
];

export const FiltersConditionList = [
  ...FilterConditionStrings,
  ...FilterConditionNumbers,
  ...FilterConditionDates,
];
