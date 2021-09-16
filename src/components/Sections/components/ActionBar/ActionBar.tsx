import { Box } from "@chakra-ui/react";
import { FiGrid } from "react-icons/fi";
import { useSeducerWithContext } from "@paprika/seducer";
import Toolbar, { Icon, ToolbarProps } from "../../../Toolbar";

import { GridLayout, ActiveAction } from "../../../../types";

interface ActionBarProps extends Omit<ToolbarProps, "children"> {
  activeAction: ActiveAction;
}

export default function ActionBar(props: ActionBarProps) {
  const [state, dispatch, action] = useSeducerWithContext();
  const { rect, isActiveSection, activeAction } = props;

  function handleClickInsertGridInSection(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    event.stopPropagation();

    const gridLayout: GridLayout = {
      key: `$grid${state.activeSection}`,
      type: "grideLayout",
      columns: 5,
      rows: 4,
      gap: 12
    };

    dispatch(action.setGridLayoutForSection, {
      id: state.activeSection,
      gridLayout
    });
  }

  const activeActionGridLayout: ActiveAction = "gridLayout";

  return (
    <Toolbar
      rect={rect}
      isActiveSection={isActiveSection}
      gridGap="4px"
      padding="4px 8px"
      top={42}
      left={0}
    >
      <Box paddingRight="16px">Section</Box>
      <Icon
        isActionActive={activeAction === activeActionGridLayout}
        onClick={handleClickInsertGridInSection}
      >
        <FiGrid />
      </Icon>
    </Toolbar>
  );
}
