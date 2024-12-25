import { Dispatch, SetStateAction } from "react";
import {
  FilterConditionNumberType,
  FilterConditionStringType,
  MachineTableAlignments,
} from "../types/machines";

export const FilterConditionStrings: FilterConditionStringType[] = [
  "Is empty",
  "Is not empty",
  "Is equal to",
  "Is not equal to",
];
export const FilterConditionNumbers: FilterConditionNumberType[] = [
  "Is empty",
  "Is not empty",
  "Is equal to",
  "Is not equal to",
  "Greater than",
  "Greater than or equal to",
  "Less than",
  "Less than or equal to",
  "Is between",
  "Is not between",
  "None",
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
