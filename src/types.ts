export type Sections = Map<string, Section>;

export interface State {
  sections: Sections;
  sectionsOrder: Array<String>;
  lastestSectionAddedId: string | null;
  activeSection: string | null;
}

export interface Section {
  id: string;
  width: SectionWidth;
  content: React.ReactElement | Layout | null;
}

export type SectionWidth = "100%" | number;
export type SectionType = "section";

export interface Layout {
  columns: number;
  rows: number;
  gap: number;
  content: React.ReactElement | Layout;
  type: Layout;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
}
