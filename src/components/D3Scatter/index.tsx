import * as d3 from "d3";
import { type FunctionComponent, useRef, useEffect, useLayoutEffect, useState } from "react";
import type CSVRow from "src/types/csv-row";
import IToolOptions from "src/utils/tool-options";
interface Props {
  data: CSVRow[] | null;
  visualizationState: IToolOptions;
}
const D3Scatter: FunctionComponent<Props> = ({ data, visualizationState }) => {
  const scatterRef = useRef(null);
  const svgRef = useRef(false);
  console.log(visualizationState);

  const createScatterPlotSVG = (visualizationState: IToolOptions) => {
    console.log("Function called!");
    const svg = d3
      .select(scatterRef.current)
    //Create an svg of some size.
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[visualizationState && visualizationState.scatterPlotOptions?.preferredXColumn])])
      .range([50, 450]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[visualizationState && visualizationState.scatterPlotOptions?.preferredYColumn])])
      .range([450, 50]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0, ${450})`).call(xAxis);

    svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
    //Add data points
    if (visualizationState && visualizationState.scatterPlotOptions && visualizationState.scatterPlotOptions.preferredYColumn && visualizationState.scatterPlotOptions.preferredXColumn) {
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d[visualizationState && visualizationState.scatterPlotOptions.preferredXColumn]))
        .attr("cy", (d) => yScale(d[visualizationState && visualizationState.scatterPlotOptions.preferredYColumn]))
        .attr("r", 5)
        .attr("fill", "steelblue");

    }
    //Scatter plot title
    if (visualizationState && visualizationState.visualizationTitle) {
      svg.append("text")
        .attr("x", 500 / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text(visualizationState.visualizationTitle);
    } else {
      svg.append("text")
        .attr("x", 500 / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Plot Title");
    }
    // Add axes labels and a title to the plot
    if (visualizationState && visualizationState.scatterPlotOptions && visualizationState.scatterPlotOptions.xAxisLabel) {
      svg.append("text")
        .attr("x", 500 / 2)
        .attr("y", 500 - 18)
        .attr("text-anchor", "middle")
        .text(visualizationState.scatterPlotOptions.xAxisLabel);
    }
    if (visualizationState && visualizationState.scatterPlotOptions && visualizationState.scatterPlotOptions.yAxisLabel) {
      svg.append("text")
        .attr("x", -500 / 2)
        .attr("y", 18)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text(visualizationState.scatterPlotOptions.yAxisLabel);
    }
  };

  useLayoutEffect(() => {
    d3.select(scatterRef.current).selectAll("*").remove();
    createScatterPlotSVG(visualizationState);
  }, [data, visualizationState]);
  return <svg width="500" height="500" ref={scatterRef}></svg>;
};

export default D3Scatter;
