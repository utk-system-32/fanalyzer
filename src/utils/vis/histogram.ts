import type IToolOptions from "../tool-options";
import type CSVRow from "src/types/csv-row";
import * as d3 from "d3";
import { getMaxOfDataset } from "./general";

export function createHistogramSVG(
  data: CSVRow[],
  visRef: React.MutableRefObject<null>,
  visualizationState: IToolOptions
) {
  const svg = d3.select(visRef.current);
  const width = visualizationState.visualizationWidth ?? 500;
  const height = visualizationState.visualizationHeight ?? 500;
  const x = visualizationState.histPlotOptions.preferredDataColumn;
  const dataPointColor = visualizationState.histPlotOptions.dataPointColor;
  const title = visualizationState.visualizationTitle;
  const xLabel = visualizationState.histPlotOptions.xAxisLabel;
  const yLabel = visualizationState.histPlotOptions.yAxisLabel;

  //Append the SVG object.
  svg.attr("width", width).attr("height", height);
  svg.style("background-color", "white");
}

const insertHistDataPoints = () => {
  return;
};

const createHistScalesAndBins = (
  svg: d3.Selection<null, unknown, null, undefined>,
  data: CSVRow[],
  xColumnName: string,
  yColumnName: string,
  width: number,
  height: number
) => {
  //Create the X scale

  return;
};
