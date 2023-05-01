import { type FunctionComponent, type SyntheticEvent } from "react";
import type IToolOptions from "src/utils/tool-options";
interface Props {
  visualizationState?: IToolOptions;
  handleVisualizationState(e: SyntheticEvent): void;
}
const VisualizationOptions: FunctionComponent<Props> = ({
  visualizationState,
  handleVisualizationState,
}) => {
  return (
    <>
      <h1 className="text-center text-2xl font-semibold">Visualizations</h1>
      <h1 className="text-lg font-semibold">Visualization Type</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the visualization preset that you would like to use.
      </p>
      <select
        name="visualizationType"
        value={visualizationState && visualizationState.visualizationType}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
      >
        <option value="">Please select a visualization preset.</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bar">Bar Graph</option>
        <option value="histogram">Histogram</option>
        <option value="pie">Pie Chart</option>
      </select>
      <h1 className="text-lg font-semibold">Visualization Title</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter the title of the visualization.
      </p>
      <input
        name="visualizationTitle"
        type="text"
        value={visualizationState && visualizationState.visualizationTitle}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
        placeholder="Visualization Title"
      />
      <h1 className="text-lg font-semibold">Visualization Width</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter the width of the visualization.
      </p>
      <input
        name="visualizationWidth"
        type="number"
        min="1"
        value={visualizationState && visualizationState.visualizationWidth}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
        placeholder="500"
      />
      <h1 className="text-lg font-semibold">Visualization Height</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter the width of the visualization.
      </p>
      <input
        name="visualizationHeight"
        type="number"
        min="1"
        value={visualizationState && visualizationState.visualizationHeight}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
        placeholder="500"
      />
      <hr />
    </>
  );
};

export default VisualizationOptions;
