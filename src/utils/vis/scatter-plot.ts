import * as d3 from "d3";
import type IToolOptions from "src/utils/tool-options";
import type CSVRow from "src/types/csv-row";

export default function createScatterPlotSVG(
  data: CSVRow[],
  visRef: React.MutableRefObject<null>,
  divRef: React.MutableRefObject<null>,
  visualizationState: IToolOptions
) {
  //Initialize our visualization object.
  const visualization = d3.select(visRef.current);
  const width = visualizationState.visualizationWidth ?? 500;
  const height = visualizationState.visualizationHeight ?? 500;
  const x = visualizationState.scatterPlotOptions.preferredXColumn;
  const y = visualizationState.scatterPlotOptions.preferredYColumn;
  const dataPointColor = visualizationState.scatterPlotOptions.dataPointColor;
  const title = visualizationState.visualizationTitle;
  const xLabel = visualizationState.scatterPlotOptions.xAxisLabel;
  const yLabel = visualizationState.scatterPlotOptions.yAxisLabel;
  //Append the SVG object.
  visualization.append("svg").attr("width", width).attr("height", height);

  const svg = visualization.select("svg");
  svg.style("background-color", "white");
  //Get our x and y scales
  const { xScale, yScale } = createXAndYScale(data, x, y, width, height);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  //Append the x and y axis to our visualization.
  svg
    .append("g")
    .attr("transform", `translate(0, ${width - 50})`)
    .call(xAxis);
  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

  //Insert our datapoints
  insertDataPoints(svg, data, xScale, yScale, x, y, dataPointColor);
  //Add the visualization title
  createTitle(svg, width, title);
  //Add x and y axis labels.
  createXAndYAxisLabels(svg, width, height, xLabel, yLabel);

  return svg;
}

const insertDataPoints = (
  svg: d3.Selection<d3.BaseType, unknown, null, undefined>,
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
      !isNaN(Number(d[yColumnName])) ? xScale(Number(d[yColumnName])) : 0
    )
    .attr("r", 5)
    .attr("fill", dataPointColor);
};

const createTitle = (
  svg: d3.Selection<d3.BaseType, unknown, null, undefined>,
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
  svg: d3.Selection<d3.BaseType, unknown, null, undefined>,
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

const createXAndYScale = (
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

// const displayContentDiv = () => {
//   console.log("TODO");
// };

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
