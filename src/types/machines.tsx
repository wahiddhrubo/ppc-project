export type FilterConditionStringType =
  | "Exact Match"
  | "Contains"
  | "Not Contains"
  | "Starts With"
  | "Ends With";

export type FilterConditionNumberType =
  | "Range"
  | "Greater Than"
  | "Less Than"
  | "Exact Match";

export type FilterConditionTypeDate =
  | "Exact Date"
  | "Date Range"
  | "Before"
  | "After"
  | "Yesterday"
  | "Past 7 Days"
  | "Last Month"
  | "Last Year";

export type FilterCondition = {
  id: string;
  condition:
    | FilterConditionNumberType
    | FilterConditionStringType
    | FilterConditionTypeDate;
  type: "string" | "number" | "date";
  value: string;
  value2: string;
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
  condition:
    | FilterConditionNumberType
    | FilterConditionStringType
    | FilterConditionTypeDate;
  value: string;
  value2: string;
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
