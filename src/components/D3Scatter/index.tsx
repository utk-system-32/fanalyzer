import * as d3 from "d3";
import React, { type FunctionComponent, useRef, useLayoutEffect } from "react";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
import createScatterPlotSVG from "src/utils/vis/scatter-plot";
interface Props {
  data: CSVRow[] | null;
  visualizationState: IToolOptions;
  setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>;
}
const D3Scatter: FunctionComponent<Props> = ({
  data,
  visualizationState,
  setVisualizationState,
}) => {
  const scatterRef = useRef(null);
  const divRef = useRef(null);
  const visRef = useRef(null);
  // const createScatterPlotSVG = (
  //   data: CSVRow[] | null,
  //   scatterRef: React.MutableRefObject<null>,
  //   divRef: React.MutableRefObject<null>,
  //   visualizationState: IToolOptions
  // ) => {
  //   const svg = d3.select(scatterRef.current);
  //   //Add background color
  //   svg.style("background-color", "white");

  //   //Add data points
  //   if (
  //     data &&
  //     visualizationState &&
  //     visualizationState.scatterPlotOptions &&
  //     visualizationState.scatterPlotOptions.preferredYColumn &&
  //     visualizationState.scatterPlotOptions.preferredXColumn
  //   ) {
  //     //Create an svg of some size.
  //     const xScale = d3
  //       .scaleLinear()
  //       .domain([
  //         0,
  //         d3.max(
  //           data,
  //           (d) =>
  //             d[
  //               visualizationState &&
  //                 visualizationState.scatterPlotOptions?.preferredXColumn
  //             ]
  //         ),
  //       ])
  //       .range([
  //         50,
  //         visualizationState && visualizationState.visualizationWidth - 50,
  //       ]);

  //     const yScale = d3
  //       .scaleLinear()
  //       .domain([
  //         0,
  //         d3.max(
  //           data,
  //           (d) =>
  //             d[
  //               visualizationState &&
  //                 visualizationState.scatterPlotOptions?.preferredYColumn
  //             ]
  //         ),
  //       ])
  //       .range([
  //         visualizationState && visualizationState.visualizationHeight - 50,
  //         50,
  //       ]);

  //     const xAxis = d3.axisBottom(xScale);
  //     const yAxis = d3.axisLeft(yScale);
  //     svg
  //       .append("g")
  //       .attr(
  //         "transform",
  //         `translate(0, ${
  //           visualizationState && visualizationState.visualizationWidth - 50
  //         })`
  //       )
  //       .call(xAxis);

  //     svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
  //     svg
  //       .selectAll("circle")
  //       .data(data)
  //       .enter()
  //       .append("circle")
  //       .attr("cx", (d) =>
  //         xScale(
  //           d[
  //             visualizationState &&
  //               visualizationState.scatterPlotOptions?.preferredXColumn
  //           ]
  //         )
  //       )
  //       .attr("cy", (d) =>
  //         yScale(
  //           d[
  //             visualizationState &&
  //               visualizationState.scatterPlotOptions.preferredYColumn
  //           ]
  //         )
  //       )
  //       .attr("r", 5)
  //       .attr(
  //         "fill",
  //         visualizationState &&
  //           visualizationState.scatterPlotOptions.dataPointColor
  //       )
  //       .on("click", function (event, d) {
  //         // Get the mouse position
  //         const [x, y] = d3.pointer(event, svg.node());

  //         // Show the div
  //         const contentDiv = d3.select(divRef.current);

  //         const content = `<h2>${
  //           d[
  //             visualizationState &&
  //               visualizationState.scatterPlotOptions &&
  //               visualizationState.scatterPlotOptions.preferredXColumn
  //           ]
  //         },${
  //           d[
  //             visualizationState &&
  //               visualizationState.scatterPlotOptions &&
  //               visualizationState.scatterPlotOptions.preferredYColumn
  //           ]
  //         }</h2>`;

  //         contentDiv.html(content);
  //         contentDiv
  //           .style("display", "flex")
  //           .style("left", x.toString() + "px")
  //           .style("top", y.toString() + "px");
  //       });
  //   }
  //   //Scatter plot title
  //   if (
  //     visualizationState &&
  //     visualizationState.visualizationTitle &&
  //     visualizationState.visualizationWidth != undefined
  //   ) {
  //     svg
  //       .append("text")
  //       .attr(
  //         "x",
  //         visualizationState && visualizationState.visualizationWidth / 2
  //       )
  //       .attr("y", 30)
  //       .attr("text-anchor", "middle")
  //       .text(visualizationState.visualizationTitle);
  //   }
  //   // Add axes labels and a title to the plot
  //   if (
  //     visualizationState &&
  //     visualizationState.scatterPlotOptions &&
  //     visualizationState.scatterPlotOptions.xAxisLabel
  //   ) {
  //     svg
  //       .append("text")
  //       .attr(
  //         "x",
  //         visualizationState && visualizationState.visualizationWidth / 2
  //       )
  //       .attr(
  //         "y",
  //         visualizationState && visualizationState.visualizationHeight - 18
  //       )
  //       .attr("text-anchor", "middle")
  //       .text(visualizationState.scatterPlotOptions.xAxisLabel);
  //   }
  //   if (
  //     visualizationState &&
  //     visualizationState.scatterPlotOptions &&
  //     visualizationState.scatterPlotOptions.yAxisLabel
  //   ) {
  //     svg
  //       .append("text")
  //       .attr(
  //         "x",
  //         visualizationState && -(visualizationState.visualizationWidth / 2)
  //       )
  //       .attr("y", 18)
  //       .attr("text-anchor", "middle")
  //       .attr("transform", "rotate(-90)")
  //       .text(visualizationState.scatterPlotOptions.yAxisLabel);
  //   }
  //   //Add the SVG to the visualization state
  //   return svg;
  // };

  useLayoutEffect(() => {
    d3.select(visRef.current).selectAll("*").remove();
    if (data) {
      const svg = createScatterPlotSVG(
        data,
        visRef,
        divRef,
        visualizationState
      );
      // d3.select(divRef.current).selectAll("*").remove();
      const node = svg.node();
      if (node) {
        const svgString = new XMLSerializer().serializeToString(node);
        setVisualizationState((visualizationState) => ({
          ...visualizationState,
          ["visualization"]: svgString,
        }));
      }
    }
  }, [
    data,
    visualizationState.scatterPlotOptions,
    visualizationState.visualizationTitle,
    visualizationState.visualizationHeight,
    visualizationState.visualizationWidth,
  ]);
  return <div className="relative" ref={visRef}></div>;
};

export default D3Scatter;
