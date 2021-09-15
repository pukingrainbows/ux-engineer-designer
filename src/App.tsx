import {
  useSeducerWithContext,
  Provider as SeducerProvider
} from "@paprika/seducer";

import Chrome from "./components/Chrome";
import EmptySection from "./components/EmptySection";
import Sections from "./components/Sections";

import { ChakraProvider } from "@chakra-ui/react";
import { State, Sections as SectionsType } from "./types";
import * as actions from "./actions";

import "./styles.css";

interface BodyProps {
  defaultSections: SectionsType;
}

function BodyComponent(props: BodyProps) {
  const [state] = useSeducerWithContext();
  const { sections } = state;

  return sections.size ? (
    <Chrome>
      <Sections sections={sections} />
    </Chrome>
  ) : (
    <EmptySection />
  );
}

const initialState: State = {
  sections: new Map(),
  sectionsOrder: [],
  lastestSectionAddedId: null,
  activeSection: null
};

export default function App() {
  return (
    <ChakraProvider>
      <SeducerProvider initialState={initialState} actions={actions}>
        <BodyComponent defaultSections={initialState.sections} />
      </SeducerProvider>
    </ChakraProvider>
  );
}
