import { type FunctionComponent } from "react";
import React from "react";
import { Sphere } from "@react-three/drei";
import type CSVRow from "src/types/csv-row";
import IToolOptions from "src/types/tool-options";

interface IScatterPlotInput {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
}

const ScatterPlot: FunctionComponent<IScatterPlotInput> = ({
  data,
  visualizationState,
}) => {
  const preferredX =
    visualizationState &&
    visualizationState.scatterPlotOptions?.preferredXColumn;
  const preferredY =
    visualizationState &&
    visualizationState.scatterPlotOptions?.preferredYColumn;
  const xData = data && preferredX && data.map((row) => row[preferredX]);
  const yData = data && preferredY && data.map((row) => row[preferredY]);
  data?.forEach((row) => console.log(row));
  console.log(xData, yData);
  return (
    <>
      {xData &&
        yData &&
        xData.map((x, idx) => {
          let y = 0.0;
          if (idx <= yData.length) {
            y = parseInt(yData[idx]);
          }
          return <Sphere key={idx} position={[parseInt(x), y, 0.0]} />;
        })}
    </>
  );
};

export default ScatterPlot;
