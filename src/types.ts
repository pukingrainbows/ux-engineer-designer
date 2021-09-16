export type Sections = Map<string, Section>;

export type GridLayoutType = "grideLayout";
export interface GridLayout {
  key: string;
  type: GridLayoutType;
  columns: number;
  rows: number;
  gap: number;
}

export type EmptyBoxType = "empty";
export interface EmptyBox {
  key: string;
  type: EmptyBoxType;
  children: [];
}

export type WidgetTypes = GridLayoutType | EmptyBoxType;

export interface State {
  sections: Sections;
  sectionsOrder: Array<String>;
  lastestSectionAddedId: string | null;
  activeSection: string | null;
}

export type ActiveAction = Omit<WidgetTypes, "empty">;

export interface Section {
  id: string;
  width: SectionWidth;
  children: Array<GridLayout | EmptyBox>;
  activeAction: ActiveAction | null;
}

export type SectionWidth = "100%" | number;
export type SectionType = "section";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
}
