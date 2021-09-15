import { Box } from "@chakra-ui/react";
import { useSeducerWithContext } from "@paprika/seducer";
import { Colour } from "../../designSystem";

export default function EmptySection() {
  const [state, dispatch, types] = useSeducerWithContext();

  function handleClick() {
    dispatch(types.AddSection, "below");
  }

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexFlow="column"
      background={Colour.background}
    >
      <Box
        as="p"
        color={Colour.textDefault}
        width="360px"
        textAlign="center"
        marginBottom="32px"
      >
        Welcome to you Ecommerce Designer please start adding one section for
        you store
      </Box>
      <Box
        as="button"
        onClick={handleClick}
        padding="16px"
        fontSize="18"
        borderRadius="4"
        background={Colour.actionPrimaryDefault}
        _hover={{
          background: Colour.actionPrimaryHover,
          color: Colour.textEmphasis
        }}
      >
        Add a section
      </Box>
    </Box>
  );
}
