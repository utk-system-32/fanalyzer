import * as d3 from "d3";
import type IToolOptions from "src/utils/tool-options";
import type CSVRow from "src/types/csv-row";
import { createXAndYAxisLabels, createTitle, getMaxOfDataset } from "./general";
import { string } from "zod";

export default function createPiePlotSVG(
  data: CSVRow[],
  visRef: React.MutableRefObject<null>,
  visualizationState: IToolOptions
) {
  const svg = d3.select(visRef.current);
  const width = visualizationState.visualizationWidth ?? 500;
  const height = visualizationState.visualizationHeight ?? 500;
  const x = visualizationState.piePlotOptions.preferredDataColumn;
  const condition = visualizationState.piePlotOptions.condition;
  const conditionValue = visualizationState.piePlotOptions.conditionValue;
  const pieTrueColor = visualizationState.piePlotOptions.pieTrueColor;
  const pieFalseColor = visualizationState.piePlotOptions.pieFalseColor;
  const title = visualizationState.visualizationTitle;
  const xLabel = visualizationState.scatterPlotOptions.xAxisLabel;
  const yLabel = visualizationState.scatterPlotOptions.yAxisLabel;

  //Append the SVG object.
  svg.attr("width", width).attr("height", height);
  svg.style("background-color", "white");

  //Add the visualization title
  createTitle(svg, width, title);

  const percentages = getSlicePercentages(data, x, condition, conditionValue);

  if (x != "" && condition != "" && conditionValue != 0)
    insertPieDataPoints(
      svg,
      percentages,
      width,
      height,
      pieTrueColor,
      pieFalseColor,
      condition,
      conditionValue
    );
  return svg;
}

const insertPieDataPoints = (
  svg: d3.Selection<null, unknown, null, undefined>,
  data: number[],
  width: number,
  height: number,
  trueColor: string,
  falseColor: string,
  condition: string,
  conditionValue: number
) => {
  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie().value((d) => Number(d));

  const radius = Math.min(width, height) / 2 - 50;
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
  console.log("DATA:", data);
  const pieData = pie(data);
  const color = [trueColor, falseColor];
  console.log("PIEDATA", pieData);
  g.selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d) {
      if (d.value == data[0]) return color[0];
      return color[1];
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  g.selectAll("whatever")
    .data(pieData)
    .enter()
    .append("text")
    .text(function (d) {
      if (d.value == data[0])
        return `${createConditionText(condition, conditionValue)} (${(
          d.value * 100
        ).toFixed(2)}%)`;
      return `${createOppositeConditionText(
        condition,
        conditionValue
      )} (${(d.value * 100).toFixed(2)}%)`;
    })
    .attr("transform", function (d) {
      return `translate(${arcGenerator.centroid(d)})`;
    })
    .style("text-anchor", "middle")
    .style("font-size", 17);
};
const getSlicePercentages = (
  data: CSVRow[],
  dataColumnName: string,
  condition: string,
  conditionValue: number
) => {
  const gtCondition = (row: CSVRow) =>
    Number(row[dataColumnName]) > conditionValue;
  const gteCondition = (row: CSVRow) =>
    Number(row[dataColumnName]) >= conditionValue;
  const lteCondition = (row: CSVRow) =>
    Number(row[dataColumnName]) <= conditionValue;
  const ltCondition = (row: CSVRow) =>
    Number(row[dataColumnName]) < conditionValue;
  const eqCondition = (row: CSVRow) =>
    Number(row[dataColumnName]) === conditionValue;
  const neqCondition = (row: CSVRow) =>
    Number(row[dataColumnName]) !== conditionValue;

  let trueArr: CSVRow[] = [];
  let falseArr: CSVRow[] = [];
  switch (condition) {
    case "GT":
      trueArr = data.filter(gtCondition);
      falseArr = data.filter((row) => !gtCondition(row));
      break;
    case "GTE":
      trueArr = data.filter(gteCondition);
      falseArr = data.filter((row) => !gteCondition(row));
      break;
    case "LT":
      trueArr = data.filter(ltCondition);
      falseArr = data.filter((row) => !ltCondition(row));
      break;
    case "LTE":
      trueArr = data.filter(lteCondition);
      falseArr = data.filter((row) => !lteCondition(row));
      break;
    case "EQ":
      trueArr = data.filter(eqCondition);
      falseArr = data.filter((row) => !eqCondition(row));
      break;
    case "NE":
      trueArr = data.filter(neqCondition);
      falseArr = data.filter((row) => !neqCondition(row));
      break;
    default:
      console.error("Invalid condition");
      return [100, 0];
  }
  return [trueArr.length / data.length, falseArr.length / data.length];
};

const createConditionText = (condition: string, conditionValue: number) => {
  switch (condition) {
    case "GT":
      return `> ${conditionValue}`;
    case "GTE":
      return `>= ${conditionValue}`;
    case "LT":
      return `< ${conditionValue}`;
    case "LTE":
      return `<= ${conditionValue}`;
    case "EQ":
      return `== ${conditionValue}`;
    case "NE":
      return `!= ${conditionValue}`;
    default:
      console.error("Invalid condition text");
      return "";
  }
};

const createOppositeConditionText = (
  condition: string,
  conditionValue: number
) => {
  switch (condition) {
    case "GT":
      return `<= ${conditionValue}`;
    case "GTE":
      return `< ${conditionValue}`;
    case "LT":
      return `>= ${conditionValue}`;
    case "LTE":
      return `> ${conditionValue}`;
    case "EQ":
      return `!= ${conditionValue}`;
    case "NE":
      return `== ${conditionValue}`;
    default:
      console.error("Invalid condition text");
      return "";
  }
};
