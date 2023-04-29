import React, { type FunctionComponent, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
import { createBarPlotSVG } from "src/utils/vis/scatter-plot";
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
  useLayoutEffect(() => {
    d3.select(barRef.current).selectAll("*").remove();
    if (data) {
      const svg = createBarPlotSVG(data, barRef, visualizationState);
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
    setVisualizationState,
    visualizationState.barPlotOptions,
    visualizationState.visualizationTitle,
    visualizationState.visualizationHeight,
    visualizationState.visualizationWidth,
  ]);
  return <svg ref={barRef}></svg>;
};

export default D3Bar;
