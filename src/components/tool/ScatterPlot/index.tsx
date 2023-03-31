import { type FunctionComponent } from "react";
import React from "react";
import { Sphere } from "@react-three/drei";

interface IScatterPlotInput {
  xData?: number[];
  yData?: number[];
}

const ScatterPlot: FunctionComponent<IScatterPlotInput> = ({
  xData,
  yData,
}) => {
  return (
    <>
      <Sphere />
    </>
  );
};

export default ScatterPlot;
