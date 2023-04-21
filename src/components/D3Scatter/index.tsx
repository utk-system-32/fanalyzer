import * as d3 from "d3";
import React, { type FunctionComponent, useRef, useLayoutEffect } from "react";
import type CSVRow from "src/types/csv-row";
import IToolOptions from "src/utils/tool-options";
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

  const createScatterPlotSVG = (
    scatterRef: React.MutableRefObject<null>,
    divRef: React.MutableRefObject<null>,
    visualizationState: IToolOptions,
    setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>
  ) => {
    const svg = d3.select(scatterRef.current);
    //Add background color
    svg.style("background-color", "white");

    //Add data points
    if (
      visualizationState &&
      visualizationState.scatterPlotOptions &&
      visualizationState.scatterPlotOptions.preferredYColumn &&
      visualizationState.scatterPlotOptions.preferredXColumn
    ) {
      //Create an svg of some size.
      const xScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(
            data,
            (d) =>
              d[
                visualizationState &&
                  visualizationState.scatterPlotOptions?.preferredXColumn
              ]
          ),
        ])
        .range([
          50,
          visualizationState && visualizationState.visualizationWidth - 50,
        ]);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(
            data,
            (d) =>
              d[
                visualizationState &&
                  visualizationState.scatterPlotOptions?.preferredYColumn
              ]
          ),
        ])
        .range([
          visualizationState && visualizationState.visualizationHeight - 50,
          50,
        ]);

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
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) =>
          xScale(
            d[
              visualizationState &&
                visualizationState.scatterPlotOptions.preferredXColumn
            ]
          )
        )
        .attr("cy", (d) =>
          yScale(
            d[
              visualizationState &&
                visualizationState.scatterPlotOptions.preferredYColumn
            ]
          )
        )
        .attr("r", 5)
        .attr(
          "fill",
          visualizationState &&
            visualizationState.scatterPlotOptions.dataPointColor
        )
        .on("click", function (event, d) {
          // Get the mouse position
          const [x, y] = d3.pointer(event, svg.node());

          // Show the div
          d3.select(divRef.current)
            .style("display", "block")
            .style("left", x + "px")
            .style("top", y + "px");
        });
    }
    //Scatter plot title
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
    } else {
      svg
        .append("text")
        .attr("x", visualizationState && 500 / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Plot Title");
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
        .text(visualizationState.scatterPlotOptions.xAxisLabel);
    }
    if (
      visualizationState &&
      visualizationState.scatterPlotOptions &&
      visualizationState.scatterPlotOptions.yAxisLabel
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
        .text(visualizationState.scatterPlotOptions.yAxisLabel);
    }
    //Add the SVG to the visualization state
    return svg;
  };

  useLayoutEffect(() => {
    d3.select(scatterRef.current).selectAll("*").remove();
    let svg = createScatterPlotSVG(
      scatterRef,
      divRef,
      visualizationState,
      setVisualizationState
    );
    d3.select(divRef.current).selectAll("*").remove();

    const svgString = new XMLSerializer().serializeToString(svg.node());
    setVisualizationState((visualizationState) => ({
      ...visualizationState,
      ["visualization"]: svgString,
    }));
  }, [
    data,
    visualizationState.scatterPlotOptions,
    visualizationState.visualizationTitle,
    visualizationState.visualizationHeight,
    visualizationState.visualizationWidth,
  ]);
  return (
    <div className="relative">
      <svg
        width={
          visualizationState && visualizationState.visualizationWidth
            ? visualizationState.visualizationWidth
            : 500
        }
        height={
          visualizationState && visualizationState.visualizationHeight
            ? visualizationState.visualizationHeight
            : 500
        }
        ref={scatterRef}
      ></svg>
      <div className="absolute hidden border bg-white p-2" ref={divRef}>
        Test
        <button>Close</button>
      </div>
    </div>
  );
};

export default D3Scatter;
