import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { GridLayout as GridLayoutType } from "../../types";
import { HTMLChakraProps } from "@chakra-ui/system";

type GridLayoutProps = HTMLChakraProps<"div"> & GridLayoutType;

// this might be a naive way of implementing the grid layout component or not? :P
export default function GridLayout(props: GridLayoutProps) {
  const { rows, columns, gap } = props;
  const cellsArray = Array(rows * columns).fill(null);
  const gridTemplate = useMemo(() => {
    const columnsArray = Array(columns).fill(null);
    const rowsArray = Array(rows).fill(null);

    return {
      display: "grid",
      gridTemplateColumns: columnsArray.map(() => "1fr").join(" "),
      gridTemplateRows: rowsArray.map(() => "1fr").join(" "),
      gridGap: `${gap}px ${gap}px`,
      gridTemplateAreas: `
        ${rowsArray
          .map(() => {
            return `"${columnsArray
              .map(() => {
                return ".";
              })
              .join(" ")}"`;
          })
          .join("\n")}
      `
    };
  }, [rows, columns, gap]);

  // uncomment this one to see the gridTemplate structure
  // console.log(gridTemplate);
  return (
    <Box {...gridTemplate} width="100%" height="100%">
      {cellsArray.map(() => {
        return (
          <div style={{ border: "1px solid red" }}>
            <button onClick={() => alert("click")}>click</button>
          </div>
        );
      })}
    </Box>
  );
}
