import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Section as SectionType } from "../../types";
import Button from "./Button";
import { useSeducerWithContext } from "@paprika/seducer";
import { toRGBA, Colour } from "../../designSystem";

interface SectionProps {
  section: SectionType;
}

export default function Section(props: SectionProps) {
  const { section } = props;
  const [state, dispatch, action] = useSeducerWithContext();
  const [isHighlighted, setIsHighlighted] = useState<Boolean>(false);
  const [isSectionActive, setIsSectionActive] = useState<Boolean>(false);

  function handleInsertAbove(event: MouseEvent) {
    event.stopPropagation();
    dispatch(action.AddSection, { id: section.id, position: "above" });
  }

  function handleInsertBelow(event: MouseEvent) {
    event.stopPropagation();
    dispatch(action.AddSection, { id: section.id, position: "below" });
  }

  function handleMouseEnter() {
    setIsHighlighted(true);
  }
  function handleMouseLeave() {
    setIsHighlighted(false);
  }

  function handleFocus() {
    setIsHighlighted(true);
  }
  function handleBlur() {
    setIsHighlighted(false);
  }

  function handleClick(event: MouseEvent) {
    if (isSectionActive) {
      dispatch(action.activeSection, null);
      return;
    }
    dispatch(action.activeSection, section.id);
  }

  useEffect(() => {
    console.log("action.activeSection", state.activeSection);
    console.log("section.id", section.id);
    if (state.activeSection === section.id) {
      setIsSectionActive(true);
      return;
    }
    setIsSectionActive(false);
  }, [state.activeSection, section.id]);

  const [hoverBorderCSS] = toRGBA(Colour.interactiveBoxHover, 0.5);

  const interactiveStatus = isSectionActive
    ? {
        boxShadow: `0 0 0 1px ${Colour.interactiveBoxSelected}`
      }
    : {
        _hover: {
          border: `1px dashed ${hoverBorderCSS}`
        }
      };

  return (
    <Box
      as="button"
      display="block"
      width="100%"
      position="relative"
      height="240px"
      data-name="section"
      data-section-id={section.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      {...interactiveStatus}
    >
      <Box color={Colour.textDefault}>{section.id}</Box>
      <Box opacity={isSectionActive ? 1 : 0}>
        <Button onClick={handleInsertAbove} top="-20px" />
        <Button onClick={handleInsertBelow} bottom="9px" />
      </Box>
    </Box>
  );
}
