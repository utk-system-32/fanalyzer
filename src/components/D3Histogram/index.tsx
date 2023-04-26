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

    // Set up scales
    const xScale = d3
        .scaleLinear()
        .domain(0, data.map((d) => d[visualizationState &&
            visualizationState.scatterPlotOptions?.preferredXColumn]))
        .range([50, visualizationState && visualizationState.visualizationWidth - 50])
        .padding(0.1);


    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d[visualizationState &&
            visualizationState.scatterPlotOptions?.preferredYColumn])])
        .range([visualizationState && visualizationState.visualizationHeight - 50, 50]);

    // Create bars
    svg
      .selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.x0))
      .attr('y', (d) => yScale(d.length))
      .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
      .attr('height', (d) => (svg.attr('height') - 50) - yScale(d.length))
      .attr('fill', 'steelblue');

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0, ${
        visualizationState && visualizationState.visualizationWidth - 50
      })`
      ).call(xAxis);
    svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);


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