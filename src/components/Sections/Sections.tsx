import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Section from "../Section";
import { useSeducerWithContext } from "@paprika/seducer";
import { Section as SectionType, Sections as SectionsType } from "../../types";

interface SectionsProps {
  sections: SectionsType;
}

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
} | null;

function getRect(element: HTMLButtonElement): Rect {
  const { x, y, width, height, top, left } = element.getBoundingClientRect();
  return { x, y, width, height, top, left };
}

function getSectionElement(id: string) {
  const section: HTMLButtonElement | null = document.querySelector(
    `[data-section-id='${id}']`
  );
  return section;
}

export default function Sections(props: SectionsProps) {
  const [gridToolPosition, setGridPosition] = useState<Rect>(null);
  const [state] = useSeducerWithContext();

  useEffect(() => {
    function handleScroll() {
      const sectionElement = getSectionElement(state.activeSection);
      if (sectionElement) {
        setGridPosition(getRect(sectionElement));
        return;
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [state.activeSection]);

  useEffect(() => {
    const sectionElement = getSectionElement(state.activeSection);
    if (sectionElement) {
      setGridPosition(getRect(sectionElement));
      return;
    }
    setGridPosition(null);
  }, [state.activeSection]);

  return (
    <>
      {gridToolPosition ? (
        <Box
          position="fixed"
          background="red"
          top={`${gridToolPosition.y}px`}
          left={`${gridToolPosition.x}px`}
          width={gridToolPosition.width}
          height="24px"
        ></Box>
      ) : null}
      {state.sectionsOrder.map((sectionId: string) => {
        const section: SectionType = state.sections.get(sectionId);

        return <Section section={section} key={section.id} />;
      })}
    </>
  );
}
