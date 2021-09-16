import { Box } from "@chakra-ui/react";
import { Colour } from "../../designSystem";
import { HTMLChakraProps } from "@chakra-ui/system";
import { Rect } from "../../types";

export interface ToolbarProps extends HTMLChakraProps<"div"> {
  isActiveSection: boolean;
  rect: Rect;
  children: React.ReactNode;
}

export default function Toolbar(props: ToolbarProps) {
  const {
    isActiveSection,
    rect,
    children,
    top = 0,
    left = 0,
    ...moreProps
  } = props;

  const _top = top as number;
  const _left = left as number;

  return isActiveSection ? (
    <Box
      position="fixed"
      background="#262E3A"
      color="white"
      top={`${rect.y - _top}px`}
      left={`${rect.x - _left}px`}
      zIndex="2"
      fontSize="12px"
      display="flex"
      alignItems="center"
      borderRadius="2px"
      {...moreProps}
    >
      {children}
    </Box>
  ) : null;
}

interface IconProps extends HTMLChakraProps<"div"> {
  children: NonNullable<React.ReactNode>;
  isActionActive: boolean;
}

export function Icon(props: IconProps) {
  const { children, isActionActive, ...moreProps } = props;
  return (
    <Box
      width="24px"
      height="24px"
      as="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={isActionActive ? Colour.secondary : "white"}
      {...moreProps}
    >
      {children}
    </Box>
  );
}
