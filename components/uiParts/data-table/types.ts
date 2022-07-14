export type ColumnType = {
  sourceId: number;
  columnId: string;
  columnName: string;
  width: number;
};

export type DataTableType = {
  columns: ColumnType[];
  rows: string[][];
};
