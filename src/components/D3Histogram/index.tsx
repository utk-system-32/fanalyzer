import { type FunctionComponent, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import type CSVRow from "src/types/csv-row";
import IToolOptions from "src/utils/tool-options";

interface Props {
    data: CSVRow[] | null;
    visualizationState: IToolOptions;
    setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>;
}

const D3Histogram: FunctionComponent<Props> = ({ 
    data,
    visualizationState,
    setVisualizationState, 
}) => {
    const histogramRef = useRef(null);
    const svgRef = useRef(false);

const makeHistogram = (
    visualizationState: IToolOptions,
    setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>
    ) => {
    
    const svg = d3.select(histogramRef.current);

  if (
    data &&
    visualizationState &&
    visualizationState.scatterPlotOptions &&
    visualizationState.scatterPlotOptions.preferredYColumn &&
    visualizationState.scatterPlotOptions.preferredXColumn
  ) {
    // Set up scales
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

    //Sets up "bins" for x-axis
    const bin = d3.bin()
      .domain(xScale.domain())
      .value((d) =>
      d[
        visualizationState &&
          visualizationState.scatterPlotOptions?.preferredXColumn
      ])
      .thresholds(10);
    
    const binnedData = bin(data)


    const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(
        binnedData,
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

    

    // Create bars
    svg
      .selectAll('rect')
      .data(binnedData)
      .append('rect')
      .attr('x', (d) =>
      d[
        visualizationState &&
          visualizationState.scatterPlotOptions?.preferredXColumn
      ])
      .attr('y', (d) => yScale(d.length))
      .attr('width',
        (d) => d3.max(
          0, d[
            visualizationState &&
              visualizationState.scatterPlotOptions?.preferredXColumn
          ]
        ) - 1)
      .attr('height', (d) =>
      (visualizationState && visualizationState.visualizationHeight) -
      50 -
      yScale(
        d[
          visualizationState &&
            visualizationState.barPlotOptions &&
            visualizationState.barPlotOptions.preferredYColumn
        ]
      ))
      .attr('fill', 'steelblue');

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0, ${
        visualizationState && visualizationState.visualizationWidth - 50
      })`
      ).call(xAxis);
    svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
  
  }

    if (visualizationState && visualizationState.visualizationTitle) {
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
          .attr(
            "x",
            visualizationState && visualizationState.visualizationWidth / 2
          )
          .attr("y", 30)
          .attr("text-anchor", "middle")
          .text("Plot Title");
      }


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

      return svg;
    
  };

useLayoutEffect(() => {
    d3.select(histogramRef.current).selectAll("*").remove();
    let svg = makeHistogram(visualizationState, setVisualizationState);

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
    <svg
      width={visualizationState && visualizationState.visualizationWidth}
      height={visualizationState && visualizationState.visualizationHeight}
      ref={histogramRef}
    ></svg>
  );
};

export default D3Histogram;