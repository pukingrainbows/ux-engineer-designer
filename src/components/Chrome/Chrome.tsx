import { Box } from "@chakra-ui/react";
import { Colour } from "../../designSystem";

export default function Chrome(props: { children: React.ReactChildren }) {
  const { children } = props;

  return (
    <Box
      padding="64px"
      position="relative"
      width="100%"
      heigh="100%"
      background={Colour.background}
    >
      <Box data-name="chrome">{children}</Box>
    </Box>
  );
}
