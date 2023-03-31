import { type FunctionComponent } from "react";
import { Sphere } from "@react-three/drei";

interface IScatterPlotInput {
  xData: number[];
  yData: number[];
}

const ScatterPlot: FunctionComponent<IScatterPlotInput> = ({
  xData,
  yData,
}) => {
  console.log(xData);
  console.log(yData);
  return (
    <>
      <Sphere />
    </>
  );
};

export default ScatterPlot;
