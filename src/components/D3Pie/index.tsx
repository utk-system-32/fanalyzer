import { useRef, type FunctionComponent, useLayoutEffect } from "react";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
import * as d3 from "d3";
import createPiePlotSVG from "src/utils/vis/pie-plot";
interface Props {
  data: CSVRow[] | null;
  visualizationState: IToolOptions;
  setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>;
}
const D3Pie: FunctionComponent<Props> = ({
  data,
  visualizationState,
  setVisualizationState,
}) => {
  const visRef = useRef(null);
  useLayoutEffect(() => {
    d3.select(visRef.current).selectAll("*").remove();
    if (data) {
      const svg = createPiePlotSVG(data, visRef, visualizationState);
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
    visualizationState.piePlotOptions,
    visualizationState.visualizationTitle,
    visualizationState.visualizationHeight,
    visualizationState.visualizationWidth,
  ]);
  return <svg ref={visRef}></svg>;
};

export default D3Pie;
