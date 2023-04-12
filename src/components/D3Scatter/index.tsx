import * as d3 from "d3";
import { type FunctionComponent, useRef, useEffect, useState } from "react";
import type CSVRow from "src/types/csv-row";
interface Props {
	data: CSVRow[] | null;
}
const D3Scatter: FunctionComponent<Props> = ({ data }) => {
	const scatterRef = useRef(null);
	const [svgGenerated, setSvgGenerated] = useState(false);
	useEffect(() => {
		console.log("YAHOO");
		if (data) {

			const svg = d3.select(scatterRef.current)
				.append("svg")
				.attr("width", 500)
				.attr("height", 500);
			//Create an svg of some size.
			const xScale = d3.scaleLinear()
				.domain([0, d3.max(data, d => d["X"])])
				.range([50, 450]);

			const yScale = d3.scaleLinear()
				.domain([0, d3.max(data, d => d["Y"])])
				.range([450, 50]);

			const xAxis = d3.axisBottom(xScale);
			const yAxis = d3.axisLeft(yScale);
			svg.append("g")
				.attr("transform", `translate(0, ${450})`)
				.call(xAxis);

			svg.append("g")
				.attr("transform", "translate(50, 0)")
				.call(yAxis);
			//Add data points
			svg.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", d => xScale(d["X"]))
				.attr("cy", d => yScale(d["Y"]))
				.attr("r", 5)
				.attr("fill", "steelblue");
		}

	}, [data]);
	return (
		<div ref={scatterRef}></div>
	);

}

export default D3Scatter;
