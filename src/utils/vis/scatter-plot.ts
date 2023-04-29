import * as d3 from "d3";
import type IToolOptions from "src/utils/tool-options";
import type CSVRow from "src/types/csv-row";

export function createScatterPlotSVG(
  data: CSVRow[],
  visRef: React.MutableRefObject<null>,
  visualizationState: IToolOptions
) {
  //Initialize our visualization object.
  const svg = d3.select(visRef.current);
  const width = visualizationState.visualizationWidth ?? 500;
  const height = visualizationState.visualizationHeight ?? 500;
  const x = visualizationState.scatterPlotOptions.preferredXColumn;
  const y = visualizationState.scatterPlotOptions.preferredYColumn;
  const dataPointColor = visualizationState.scatterPlotOptions.dataPointColor;
  const title = visualizationState.visualizationTitle;
  const xLabel = visualizationState.scatterPlotOptions.xAxisLabel;
  const yLabel = visualizationState.scatterPlotOptions.yAxisLabel;
  //Append the SVG object.
  svg.attr("width", width).attr("height", height);
  svg.style("background-color", "white");
  //Get our x and y scales
  const { xScale, yScale } = createScatterXAndYScale(data, x, y, width, height);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  //Append the x and y axis to our visualization.
  svg
    .append("g")
    .attr("transform", `translate(0, ${width - 50})`)
    .call(xAxis);
  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

  //Insert our datapoints
  if (x != "" && y != "")
    insertScatterDataPoints(svg, data, xScale, yScale, x, y, dataPointColor);
  //Add the visualization title
  createTitle(svg, width, title);
  //Add x and y axis labels.
  createXAndYAxisLabels(svg, width, height, xLabel, yLabel);

  return svg;
}

export function createBarPlotSVG(
  data: CSVRow[],
  visRef: React.MutableRefObject<null>,
  visualizationState: IToolOptions
) {
  //Initialize our visualization object.
  const svg = d3.select(visRef.current);
  const width = visualizationState.visualizationWidth ?? 500;
  const height = visualizationState.visualizationHeight ?? 500;
  const x = visualizationState.barPlotOptions.preferredXColumn;
  const y = visualizationState.barPlotOptions.preferredYColumn;
  const dataPointColor = visualizationState.barPlotOptions.dataPointColor;
  const title = visualizationState.visualizationTitle;
  const xLabel = visualizationState.barPlotOptions.xAxisLabel;
  const yLabel = visualizationState.barPlotOptions.yAxisLabel;

  console.log(x, y);
  svg.attr("width", width).attr("height", height);
  svg.style("background-color", "white");

  const { xScale, yScale } = createBarXAndYScale(data, x, y, width, height);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  //Append the x and y axis to our visualization.
  svg
    .append("g")
    .attr("transform", `translate(0, ${width - 50})`)
    .call(xAxis);
  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
  if (x != "" && y != "")
    insertBarDataPoints(
      svg,
      data,
      xScale,
      yScale,
      x,
      y,
      dataPointColor,
      width,
      height
    );
  //Add the visualization title
  createTitle(svg, width, title);
  //Add x and y axis labels.
  createXAndYAxisLabels(svg, width, height, xLabel, yLabel);
  return svg;
}

export function createHistogramSVG() {}

export const insertScatterDataPoints = (
  svg: d3.Selection<null, unknown, null, undefined>,
  data: CSVRow[],
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  xColumnName: string,
  yColumnName: string,
  dataPointColor: string
) => {
  //Add the data points to the visualization
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) =>
      !isNaN(Number(d[xColumnName])) ? xScale(Number(d[xColumnName])) : 0
    )
    .attr("cy", (d) =>
      !isNaN(Number(d[yColumnName])) ? yScale(Number(d[yColumnName])) : 0
    )
    .attr("r", 5)
    .attr("fill", dataPointColor);
};

const insertBarDataPoints = (
  svg: d3.Selection<null, unknown, null, undefined>,
  data: CSVRow[],
  xScale: d3.ScaleBand<string>,
  yScale: d3.ScaleLinear<number, number, never>,
  xColumnName: string,
  yColumnName: string,
  dataPointColor: string,
  width: number,
  height: number
) => {
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d[xColumnName]) ?? "")
    .attr("y", (d) => yScale(Number(d[yColumnName])))
    .attr("width", xScale.bandwidth())
    .attr(
      "height",
      (d) =>
        height -
        50 -
        (!isNaN(Number(d[yColumnName])) ? yScale(Number(d[yColumnName])) : 0)
    )
    .attr("fill", dataPointColor);
};

const createTitle = (
  svg: d3.Selection<null, unknown, null, undefined>,
  width: number,
  title: string
) => {
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text(title);
};

const createXAndYAxisLabels = (
  svg: d3.Selection<null, unknown, null, undefined>,
  width: number,
  height: number,
  xLabel: string,
  yLabel: string
) => {
  //X axis label
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 18)
    .attr("text-anchor", "middle")
    .text(xLabel);
  //Y axis label
  svg
    .append("text")
    .attr("x", -(width / 2))
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text(yLabel);
};

const createScatterXAndYScale = (
  data: CSVRow[],
  xColumnName: string,
  yColumnName: string,
  width: number,
  height: number
) => {
  const maxX = getMaxOfDataset(data, xColumnName);
  //   const minX = getMinOfDataset(data, xColumnName);
  const maxY = getMaxOfDataset(data, yColumnName);
  //   const minY = getMinOfDataset(data, yColumnName);
  const xScale = d3
    .scaleLinear()
    .domain([0, maxX])
    .range([50, width - 50]);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - 50, 50]);

  return { xScale, yScale };
};

const createBarXAndYScale = (
  data: CSVRow[],
  xColumnName: string,
  yColumnName: string,
  width: number,
  height: number
) => {
  const maxY = getMaxOfDataset(data, yColumnName);

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d[xColumnName] ?? ""))
    .range([50, width - 50])
    .padding(0.1);
  const yScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - 50, 50]);

  return { xScale, yScale };
};

// const getMinOfDataset = (data: CSVRow[], columnName: string) => {
//   const num = d3.min(data, (row) => {
//     if (!isNaN(Number(row[columnName]))) {
//       return Number(row[columnName]);
//     }
//   });
//   return num ?? 0;
// };

const getMaxOfDataset = (data: CSVRow[], columnName: string) => {
  const num = d3.max(data, (row) => {
    if (!isNaN(Number(row[columnName]))) {
      return Number(row[columnName]);
    }
  });
  return num ?? 0;
};
