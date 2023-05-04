import type IToolOptions from "../tool-options";
import type CSVRow from "src/types/csv-row";
import * as d3 from "d3";
import { getMaxOfDataset, createTitle, createXAndYAxisLabels } from "./general";

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
  const { xScale, yScale, bins } = createHistScalesAndBins(
    data,
    x,
    width,
    height
  );

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  //Append the x and y axis to our visualization.
  svg
    .append("g")
    .attr("transform", `translate(0, ${width - 50})`)
    .call(xAxis);
  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

  if (x != "") insertHistDataPoints(svg, bins, xScale, yScale, dataPointColor);
  //Add the visualization title
  createTitle(svg, width, title);
  //Add x and y axis labels.
  createXAndYAxisLabels(svg, width, height, xLabel, yLabel);

  return svg;
}

const insertHistDataPoints = (
  svg: d3.Selection<null, unknown, null, undefined>,
  bins: d3.Bin<number, number>[],
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  dataPointColor: string
) => {
  svg
    .append("g")
    .attr("fill", dataPointColor)
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", (d) => xScale(d.x0 ?? 0) + 1)
    .attr("width", (d) => xScale(d.x1 ?? 0) - xScale(d.x0 ?? 0) - 1)
    .attr("y", (d) => yScale(d.length))
    .attr("height", (d) => yScale(0) - yScale(d.length));
};

const createHistScalesAndBins = (
  data: CSVRow[],
  dataColumnName: string,
  width: number,
  height: number
) => {
  //Create the X scale
  const maxX = getMaxOfDataset(data, dataColumnName);

  const numericData = data.map((d) => Number(d[dataColumnName]));
  const bins = d3
    .bin()
    .value((d) => d)
    .thresholds(10)(numericData);
  const xExtent = d3.extent(bins, (bin) => bin.x0);
  console.log(xExtent);
  const binWidth = d3.mean(bins, (d) => d.x1 ?? 0 - (d.x0 ?? 0));
  if (xExtent[1]) xExtent[1] = xExtent[1] + (binWidth ?? 0);
  const xScale = d3
    .scaleLinear()
    .domain(xExtent)
    .range([50, width - 50]);

  const frequencies = bins.map((bin) => bin.length);
  console.log(bins);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(frequencies) ?? 0])
    .range([height - 50, 50]);
  return { xScale, yScale, bins };
};
