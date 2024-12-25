export type FilterConditionStringType =
  | "Is empty"
  | "Is not empty"
  | "Is equal to"
  | "Is not equal to"
  | "None";

export type FilterConditionNumberType =
  | "Is empty"
  | "Is not empty"
  | "Is equal to"
  | "Is not equal to"
  | "Greater than"
  | "Greater than or equal to"
  | "Less than"
  | "Less than or equal to"
  | "Is between"
  | "Is not between"
  | "None";

export type FilterCondition = {
  id: string;
  condition: FilterConditionNumberType;
  type: "string" | "number";
  value: string;
};
export type MachineTableAlignments = {
  id: string;
  alignment: "left" | "center" | "right";
};

export type MaintanaceMachine = {
  machine_id: string;
  category: string;
  type: string;
  brand: string;
  model_number: string;
  serial_no: string;
  floor_no: number;
  line_no: number;
  supplier: string;
  purchase_date: string;
  location: string;
  last_breakdown_start: string;
  status: string;
};

export type FilterConditionType = {
  condition: FilterConditionNumberType;
  value: string;
};

export type MachineSearchFilters = {
  filterValue: string;
  filterConditions?: {
    conditions: FilterConditionType[];
    operator: "And" | "Or";
  };
  filterUniques: string[];
  category: string;
};
