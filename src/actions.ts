import { Section } from "./types";
import { nanoid } from "nanoid";
import { State } from "./types";

type AddSectionPosition = "above" | "below";

export function AddSection(
  state: State,
  payload: { id: string; position: AddSectionPosition }
) {
  const { id, position } = payload;
  const nextSections = new Map(state.sections);
  const nextSection: Section = {
    width: "100%",
    content: null,
    id: nanoid()
  };

  const currentIndex = state.sectionsOrder.indexOf(id);
  const insertIndexAt =
    state.sectionsOrder.length === 0
      ? 0
      : position === "above"
      ? currentIndex
      : currentIndex + 1;

  const nextSectionsOrder = [
    // part of the array before the specified index
    ...state.sectionsOrder.slice(0, insertIndexAt),
    // inserted item
    nextSection.id,
    // part of the array after the specified index
    ...state.sectionsOrder.slice(insertIndexAt)
  ];

  nextSections.set(nextSection.id, nextSection);

  return {
    ...state,
    sections: nextSections,
    lastestSectionAddedId: nextSection.id,
    sectionsOrder: nextSectionsOrder
  } as State;
}

export function activeSection(state: State, payload: string) {
  return {
    ...state,
    activeSection: payload
  };
}
