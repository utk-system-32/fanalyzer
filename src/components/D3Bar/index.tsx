import { type FunctionComponent, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type CSVRow from "src/types/csv-row";
import { scaleLinear } from 'd3-scale';
interface Props {
    data: CSVRow[] | null;
}

const D3Bar: FunctionComponent<Props> = ({ data }) => {
    const barRef = useRef(null);
    const svgRef = useRef(false);

const makeBar = () => {
    const svg = d3
        .select(barRef.current)
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);
        
    console.log(data[0]);

    // Set up scales
    const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d["X"]))
        .range([50, 450])
        .padding(0.1);
    
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d["Y"])])
        .range([450, 50]);

    // Create bars
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d["X"]))
      .attr('y', (d) => yScale(d["Y"]))
      .attr('width', xScale.bandwidth())
      //.attr('height', (d) => svg.attr('height') - yScale(d["Y"]))
      .attr('fill', 'steelblue')
      .attr('height', (d) => (svg.attr('height') - 50) - yScale(d["Y"]));


    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0, ${450})`).call(xAxis);
    svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

};

    useEffect(() => {
        if (svgRef.current) return;
        svgRef.current = true;
        makeBar();
      }, [data]);
      return <div ref={barRef}></div>;
    };
    
    export default D3Bar;
