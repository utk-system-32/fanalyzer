import { SyntheticEvent, useEffect, type FunctionComponent } from "react";
import type CSVRow from "src/types/csv-row";
import IToolOptions from "src/utils/tool-options";
interface Props {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
  handleVisualizationState(e: SyntheticEvent): void;
}
interface CSOProps {
  data?: CSVRow[] | null;
};

const ColumnSelectOptions: FunctionComponent<CSOProps> = ({ data }) => {
  return (
    <>
      {data &&
        data[0] &&
        Object.keys(data[0]).map((key, index) => (
          <option key={index} value={key}>
            {key}
          </option>
        ))}
    </>
  );
};

const DatasetOutliner: FunctionComponent<Props> = ({ data, visualizationState, handleVisualizationState }) => {
  return (
    <section className="bg-white-400 h-full min-w-[300px] border-r px-3">
      <h1 className="text-center text-2xl font-semibold">Visualizations</h1>
      <h1 className="text-lg font-semibold">Visualization Type</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the visualization preset that you would like to use.
      </p>
      <select name="visualizationType"
        value={visualizationState && visualizationState.visualizationType}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm">
        <option value="">Please select a visualization preset.</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bar">Bar Graph</option>
        <option value="histogram">Histogram</option>
      </select>
      <h1 className="text-lg font-semibold">Visualization Title</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter the title of the visualization.
      </p>
      <input
        name="visualizationTitle"
        type="text"
        value={visualizationState &&
          visualizationState.visualizationTitle}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm" 
        placeholder="Visualization Title"
      />
      <hr />
      <h1 className="mt-5 text-center text-2xl font-semibold">
        Column Configuration
      </h1>
      <h1 className="text-lg font-semibold">X Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the x-coordinates of the x-axis.
      </p>
      <select
        name="preferredXColumn"
        id="scatterPlotOptions"
        value={visualizationState && visualizationState.scatterPlotOptions?.preferredXColumn}
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm">
        <option value="">Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <h1 className="text-lg font-semibold">X-Axis Label</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter the label of the x-axis.
      </p>
      <input
        name="xAxisLabel"
        type="text"
        value={visualizationState &&
          visualizationState.scatterPlotOptions?.xAxisLabel}
        id="scatterPlotOptions"
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm" 
        placeholder="X Axis Label"
      />
      <h1 className="text-lg  font-semibold">Y Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the y coordinates on the
        y-axis.
      </p>
      <select 
        name="preferredYColumn"
        value={visualizationState?.scatterPlotOptions?.preferredYColumn}
        id="scatterPlotOptions"
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm">
        <option>Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <h1 className="text-lg font-semibold">Y-Axis Label</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter a label for the the y-axis.
      </p>
      <input
        name="yAxisLabel"
        type="text"
        value={visualizationState &&
          visualizationState.scatterPlotOptions?.yAxisLabel}
        id="scatterPlotOptions"
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm" 
        placeholder="Y Axis Label"
      />
      <hr />
    </section>
  );
};

export default DatasetOutliner;
