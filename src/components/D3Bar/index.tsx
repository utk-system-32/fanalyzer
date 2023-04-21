import { type FunctionComponent, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import type CSVRow from "src/types/csv-row";
import IToolOptions from "src/utils/tool-options";

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
    const svgRef = useRef(false);

const makeBar = (
    visualizationState: IToolOptions,
    setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>
    ) => {
    
    const svg = d3.select(barRef.current);

    // Set up scales
    const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d[visualizationState &&
            visualizationState.scatterPlotOptions?.preferredXColumn]))
        .range([50, visualizationState && visualizationState.visualizationWidth - 50])
        .padding(0.1);
    
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d[visualizationState &&
            visualizationState.scatterPlotOptions?.preferredYColumn])])
        .range([visualizationState && visualizationState.visualizationHeight - 50, 50]);

    // Create bars
    if (
        visualizationState &&
        visualizationState.scatterPlotOptions &&
        visualizationState.scatterPlotOptions.preferredYColumn &&
        visualizationState.scatterPlotOptions.preferredXColumn
      ) {
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d[visualizationState &&
        visualizationState.scatterPlotOptions.preferredXColumn]))
      .attr('y', (d) => yScale(d[visualizationState &&
        visualizationState.scatterPlotOptions.preferredYColumn]))
      .attr('width', xScale.bandwidth())
      //.attr('height', (d) => svg.attr('height') - yScale(d["Y"]))
      .attr('fill', 'steelblue')
      .attr('height', (d) => (svg.attr('height') - 50) - yScale(d[visualizationState &&
        visualizationState.scatterPlotOptions.preferredYColumn]));
      
    }

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
    d3.select(barRef.current).selectAll("*").remove();
    let svg = makeBar(visualizationState, setVisualizationState);

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
      ref={barRef}
    ></svg>
  );
};

export default D3Bar;
