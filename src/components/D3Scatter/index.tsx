import * as d3 from "d3";
import React, { type FunctionComponent, useRef, useLayoutEffect } from "react";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
import { createScatterPlotSVG } from "src/utils/vis/scatter-plot";
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

  useLayoutEffect(() => {
    d3.select(visRef.current).selectAll("*").remove();
    if (data) {
      const svg = createScatterPlotSVG(data, visRef, visualizationState);
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
  return <svg className="relative" ref={visRef}></svg>;
};

export default D3Scatter;
