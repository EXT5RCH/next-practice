export type MoveSourceType = {
  id: number;
  startX: number;
  startY: number;
  before: {
    left: number;
    top: number;
    pointer: PointerType;
  };
};

export type ColumnType = {
  id: string;
  name: string;
};

export type PointerType = {
  lx: number;
  rx: number;
  y: number;
};

export type SourceType = {
  id: number;
  name: string;
  columns: ColumnType[];
  top: number;
  left: number;
  list: {
    height: number;
    width: number;
  };
  pointer: PointerType;
};

export type EndPointType = {
  sourceId: number | null;
  x: number;
  y: number;
  position: string;
};

export type BeforeLineInfo = {
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
};

export type LineType = {
  start: EndPointType;
  end: EndPointType;
  before?: BeforeLineInfo;
};

export type WhereType = {
  info: string;
};

export type ColumnSettingType = {
  sourceId: number;
  sourceName: string;
  columnId: string;
  columnName: string;
  displayName: string;
  width: number;
  order: string | number;
  methodOrGroupBy: string;
  where: string[];
  display: boolean;
};
