import React, { type FunctionComponent, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
interface Props {
  data: CSVRow[] | null;
  visualizationState: IToolOptions;
  setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>;
}

const D3Bar: FunctionComponent<Props> = ({
  data,
  visualizationState,
  setVisualizationState,
}) => {
  const barRef = useRef(null);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    const createBarSVG = (
      barRef: React.MutableRefObject<null>,
      divRef: React.MutableRefObject<null>,
      visualizationState: IToolOptions
    ) => {
      const svg = d3.select(barRef.current);
      //Set the background color
      svg.style("background-color", "white");

      // Set up scales
      if (
        data &&
        visualizationState &&
        visualizationState.barPlotOptions &&
        visualizationState.barPlotOptions.preferredXColumn &&
        visualizationState.barPlotOptions.preferredYColumn
      ) {
        const xScale = d3
          .scaleBand()
          .domain(
            data.map(
              (d) =>
                d[
                  visualizationState &&
                    visualizationState.barPlotOptions &&
                    visualizationState.barPlotOptions.preferredXColumn
                ]
            )
          )
          .range([50, 450])
          .padding(0.1);

        const yScale = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(
              data,
              (d) =>
                d[
                  visualizationState &&
                    visualizationState.barPlotOptions &&
                    visualizationState.barPlotOptions.preferredYColumn
                ]
            ),
          ])
          .range([450, 50]);

        // Create bars
        svg
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d) =>
            xScale(
              d[
                visualizationState &&
                  visualizationState.barPlotOptions &&
                  visualizationState.barPlotOptions.preferredXColumn
              ]
            )
          )
          .attr("y", (d) =>
            yScale(
              d[
                visualizationState &&
                  visualizationState.barPlotOptions &&
                  visualizationState.barPlotOptions.preferredYColumn
              ]
            )
          )
          .attr("width", visualizationState && visualizationState.visualizationWidth)
          .attr(
            "fill",
            visualizationState &&
              visualizationState.barPlotOptions.dataPointColor
          )
          .attr(
            "height",
            (d) =>
              (visualizationState && visualizationState.visualizationHeight) -
              50 -
              yScale(
                d[
                  visualizationState &&
                    visualizationState.barPlotOptions &&
                    visualizationState.barPlotOptions.preferredYColumn
                ]
              )
          );

        // Add axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        svg
          .append("g")
          .attr(
            "transform",
            `translate(0, ${
              visualizationState && visualizationState.visualizationWidth - 50
            })`
          )
          .call(xAxis);
        svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
      }
      // Add axes labels and a title to the plot
      if (
        visualizationState &&
        visualizationState.scatterPlotOptions &&
        visualizationState.scatterPlotOptions.xAxisLabel
      ) {
        svg
          .append("text")
          .attr(
            "x",
            visualizationState && visualizationState.visualizationWidth / 2
          )
          .attr(
            "y",
            visualizationState && visualizationState.visualizationHeight - 18
          )
          .attr("text-anchor", "middle")
          .text(visualizationState.barPlotOptions.xAxisLabel);
      }
      //Plot title
      if (
        visualizationState &&
        visualizationState.visualizationTitle &&
        visualizationState.visualizationWidth
      ) {
        svg
          .append("text")
          .attr(
            "x",
            visualizationState && visualizationState.visualizationWidth / 2
          )
          .attr("y", 30)
          .attr("text-anchor", "middle")
          .text(visualizationState.visualizationTitle);
      }
      //X and Y axis labels
      if (
        visualizationState &&
        visualizationState.barPlotOptions &&
        visualizationState.barPlotOptions.xAxisLabel
      ) {
        svg
          .append("text")
          .attr(
            "x",
            visualizationState && visualizationState.visualizationWidth / 2
          )
          .attr(
            "y",
            visualizationState && visualizationState.visualizationHeight - 18
          )
          .attr("text-anchor", "middle")
          .text(visualizationState.barPlotOptions.xAxisLabel);
      }
      if (
        visualizationState &&
        visualizationState.barPlotOptions &&
        visualizationState.barPlotOptions.yAxisLabel
      ) {
        svg
          .append("text")
          .attr(
            "x",
            visualizationState && -(visualizationState.visualizationWidth / 2)
          )
          .attr("y", 18)
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .text(visualizationState.barPlotOptions.yAxisLabel);
      }

      return svg;
    };
    d3.select(barRef.current).selectAll("*").remove();
    const svg = createBarSVG(barRef, divRef, visualizationState);

    const svgString = new XMLSerializer().serializeToString(svg.node());
    setVisualizationState((visualizationState) => ({
      ...visualizationState,
      ["visualization"]: svgString,
    }));
  }, [
    data,
    setVisualizationState,
    visualizationState.barPlotOptions,
    visualizationState.visualizationTitle,
    visualizationState.visualizationHeight,
    visualizationState.visualizationWidth,
  ]);
  return (
    <svg
      ref={barRef}
      width={visualizationState && visualizationState.visualizationWidth}
      height={visualizationState && visualizationState.visualizationHeight}
    ></svg>
  );
};

export default D3Bar;
