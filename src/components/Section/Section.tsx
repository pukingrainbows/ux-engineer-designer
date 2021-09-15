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
    if (state.activeSection === section.id) {
      setIsSectionActive(true);
      return;
    }
    setIsSectionActive(false);
  }, [state.activeSection, section.id]);

  const [hoverBorderCSS] = toRGBA(Colour.interactiveBoxHover, 0.3);

  const interactiveStatus = isSectionActive
    ? {
        boxShadow: `0 0 0 1px ${Colour.interactiveBoxSelected}`
      }
    : {
        _hover: {
          boxShadow: `0 0 0 1px dashed ${hoverBorderCSS}`
        }
      };

  return (
    <Box position="relative" width="100%" height="240px">
      <Box
        as="button"
        display="block"
        position="absolute"
        data-name="section"
        width="100%"
        height="100%"
        top="0"
        data-section-id={section.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        {...interactiveStatus}
        zIndex="1"
      >
        <Box opacity={isSectionActive ? 1 : 0}>
          <Button onClick={handleInsertAbove} top="-16px" />
          <Button onClick={handleInsertBelow} bottom="8px" />
        </Box>
      </Box>
      <Box
        position="relative"
        background="white"
        color={Colour.textDefault}
        position="relative"
        height="240px"
      >
        {section.id}
      </Box>
    </Box>
  );
}
