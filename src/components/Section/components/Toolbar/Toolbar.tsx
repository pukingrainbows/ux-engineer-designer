import { Box } from "@chakra-ui/react";

import { Rect } from "../../../../types";

interface ToolbarProps {
  isActiveSection: boolean;
  rect: Rect;
  children: React.ReactNode;
}

export default function Toolbar(props: ToolbarProps) {
  const { isActiveSection, rect, children, ...moreProps } = props;
  return isActiveSection ? (
    <Box
      position="fixed"
      background="#262E3A"
      padding="4px"
      color="white"
      top={`${rect.y - 44}px`}
      left={`${rect.x - 1}px`}
      zIndex="2"
      fontSize="12px"
      height="40px"
      display="flex"
      alignItems="center"
      borderRadius="2px"
      {...moreProps}
    >
      {children}
    </Box>
  ) : null;
}
