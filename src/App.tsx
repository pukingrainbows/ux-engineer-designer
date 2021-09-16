import { ChakraProvider } from "@chakra-ui/react";
import { State } from "./types";
import * as actions from "./actions";
import { Provider as SeducerProvider } from "@paprika/seducer";
import Body from "./components/Body";
import "./styles.css";

const initialState: State = {
  sections: new Map(),
  sectionsOrder: [],
  lastestSectionAddedId: null, // initially I need it now seem useels :thinking:?
  activeSection: null
};

export default function App() {
  return (
    <ChakraProvider>
      <SeducerProvider
        displayName="designer"
        initialState={initialState}
        actions={actions}
      >
        <Body defaultSections={initialState.sections} />
      </SeducerProvider>
    </ChakraProvider>
  );
}
