import { ColorModeContext } from "@chakra-ui/react";
import { Box, BoxProps } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Colour } from "../../designSystem";

interface ButtonProps
  extends React.Component<React.HTMLProps<HTMLButtonElement>, {}> {
  top: string;
  bottom: string;
}

export default function Button(props: ButtonProps) {
  const { top, bottom, ...moreButtonProps } = props;

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      position="absolute"
      top={top}
      bottom={bottom}
    >
      <Box
        as="button"
        padding="6px"
        background={Colour.interactiveBoxSelected}
        borderRadius="100%"
        position="absolute"
        zIndex="1"
        color={Colour.textEmphasis}
        _hover={{
          background: Colour.interactiveBoxSelected,
          color: Colour.textEmphasis
        }}
        {...moreButtonProps}
      >
        <FiPlus />
      </Box>
    </Box>
  );
}
