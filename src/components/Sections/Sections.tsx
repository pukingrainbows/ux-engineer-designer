import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { FiGrid } from "react-icons/fi";

import Section from "../Section";
import { useSeducerWithContext } from "@paprika/seducer";
import Toolbar from "../Section/components/Toolbar";

import {
  Section as SectionType,
  Sections as SectionsType,
  Rect
} from "../../types";

interface SectionsProps {
  sections: SectionsType;
}

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
  const [rect, setRect] = useState<Rect | null>(null);
  const [state] = useSeducerWithContext();

  useEffect(() => {
    function handleScroll() {
      const sectionElement = getSectionElement(state.activeSection);
      if (sectionElement) {
        setRect(getRect(sectionElement));
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
      setRect(getRect(sectionElement));
      return;
    }
    setRect(null);
  }, [state.activeSection]);

  return (
    <>
      {rect ? (
        <Toolbar rect={rect} isActiveSection={Boolean(state.activeSection)}>
          <Box>Section</Box>
          <Box>
            <FiGrid />
          </Box>
        </Toolbar>
      ) : null}
      {state.sectionsOrder.map((sectionId: string) => {
        const section: SectionType = state.sections.get(sectionId);

        return <Section section={section} key={section.id} />;
      })}
    </>
  );
}
