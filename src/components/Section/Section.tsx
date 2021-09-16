import { useEffect, useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Section as SectionType } from "../../types";
import Button from "./Button";
import { useSeducerWithContext } from "@paprika/seducer";
import { toRGBA, Colour } from "../../designSystem";
import Widgets from "../../widgets";

interface SectionProps {
  section: SectionType;
}

export default function Section(props: SectionProps) {
  const refBox = useRef<HTMLDivElement>(null);
  const { section } = props;
  const [state, dispatch, action] = useSeducerWithContext();
  const [isSectionActive, setIsSectionActive] = useState<Boolean>(false);

  function handleInsertAbove(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    dispatch(action.AddSection, { id: section.id, position: "above" });
  }

  function handleInsertBelow(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    dispatch(action.AddSection, { id: section.id, position: "below" });
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

  const [hoverBorderCSS] = toRGBA(Colour.interactiveBoxHover, 1);
  const [, rgb] = toRGBA(Colour.interactiveBoxSelected, 0.4);
  const [red, green, blue] = rgb as Array<number>;

  const interactiveStatus = isSectionActive
    ? {
        borderRadius: "4px",
        border: `4px solid rgba(${red},${green},${blue}, .4)`,
        pointerEvents: "none"
      }
    : {
        _hover: {
          border: `2px dashed ${hoverBorderCSS}`
        },
        _focus: { boxShadow: "0 0 0 0", outline: "0" },
        _focusVisible: {}
      };

  return (
    <Box
      position="relative"
      width="100%"
      height="320px"
      data-section-id={section.id}
    >
      <Box
        as="button"
        display="block"
        position="absolute"
        data-name="section"
        width={refBox.current ? "" : `calc(100%)`}
        height={refBox.current ? "" : `calc(100%)`}
        top="0px"
        left="0px"
        onClick={handleClick}
        {...interactiveStatus}
        zIndex={isSectionActive ? "2" : "1"}
      ></Box>
      <Box opacity={isSectionActive ? 1 : 0}>
        <Button
          onClick={handleInsertAbove}
          disabled={!Boolean(isSectionActive)}
          top="-40px"
          zIndex="3"
        />
        <Button
          onClick={handleInsertBelow}
          disabled={!Boolean(isSectionActive)}
          bottom="-8px"
          zIndex="3"
        />
      </Box>
      <Box
        position="relative"
        background="white"
        color={Colour.textDefault}
        height="320px"
      >
        <Widgets data={section.children[0]} />
      </Box>
    </Box>
  );
}
