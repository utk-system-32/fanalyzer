import * as d3 from "d3";
import type CSVRow from "src/types/csv-row";

export const createTitle = (
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

export const createXAndYAxisLabels = (
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

export const getMinOfDataset = (data: CSVRow[], columnName: string) => {
  const num = d3.min(data, (row) => {
    if (!isNaN(Number(row[columnName]))) {
      return Number(row[columnName]);
    }
  });
  return num ?? 0;
};

export const getMaxOfDataset = (data: CSVRow[], columnName: string) => {
  const num = d3.max(data, (row) => {
    if (!isNaN(Number(row[columnName]))) {
      return Number(row[columnName]);
    }
  });
  return num ?? 0;
};
