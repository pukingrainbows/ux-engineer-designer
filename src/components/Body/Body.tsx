import { useEffect } from "react";
import { useSeducerWithContext } from "@paprika/seducer";
import { Sections as SectionsType, State } from "../../types";
import Chrome from "../Chrome";
import EmptySection from "../EmptySection";
import Sections from "../Sections";
import { Seducer } from "../../actions";

interface BodyProps {
  defaultSections: SectionsType;
}

export default function Body(props: BodyProps) {
  const [state, dispatch, action]: Seducer = useSeducerWithContext();
  const { sections } = state;

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "Escape" && state.activeSection !== null) {
        dispatch(action.activeSection, null);
      }
    }

    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [state.activeSection, dispatch, action.activeSection]);

  return sections.size ? (
    <Chrome>
      <Sections sections={sections} />
    </Chrome>
  ) : (
    <EmptySection />
  );
}
