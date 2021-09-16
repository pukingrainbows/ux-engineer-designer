import { Fragment } from "react";
import GridLayout from "./GridLayout";
import {
  GridLayout as GridLayoutObjectType,
  EmptyBox as EmptyBoxObjectType,
  GridLayoutType,
  EmptyBoxType,
  WidgetTypes
} from "../types";

const gridLayoutType: GridLayoutType = "grideLayout";
const emptyBoxType: EmptyBoxType = "empty";

interface Render {
  [gridLayoutType]: (props: GridLayoutObjectType) => JSX.Element | null;
  [emptyBoxType]: (props: EmptyBoxObjectType) => JSX.Element | null;
}

const render: Render = {
  empty: (props: EmptyBoxObjectType) => {
    const { key } = props;
    return (
      <Fragment key={key}>
        <>empty</>
      </Fragment>
    );
  },
  grideLayout: (props: GridLayoutObjectType) => {
    const { key, columns, type, rows, gap } = props;
    return (
      <GridLayout
        type={type}
        key={key}
        columns={columns}
        rows={rows}
        gap={gap}
      />
    );
  }
};

type WidgetData = GridLayoutObjectType | EmptyBoxObjectType;

interface WidgetsProps {
  data: WidgetData;
  children?: React.ReactNode;
}

export default function Widgets(props: WidgetsProps): JSX.Element {
  const { data } = props;
  const type: WidgetTypes = data.type;

  console.log("type", type);
  if (type in render) {
    const Component = render[type] as React.FunctionComponent;
    return <Component {...data} />;
  }

  return (
    <>There is not Implementation for `${JSON.stringify(props, null, 2)}`</>
  );
}
