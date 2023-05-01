import React, { type FunctionComponent, type SyntheticEvent } from "react";
import type IToolOptions from "src/utils/tool-options";
import type CSVRow from "src/types/csv-row";
import ColumnSelectOptions from "../ColumnSelectOptions";
import { HexColorPicker } from "react-colorful";
interface Props {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
  handleVisualizationState(e: SyntheticEvent): void;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
const ScatterPlotOptions: FunctionComponent<Props> = ({
  data,
  visualizationState,
  handleVisualizationState,
  color,
  setColor,
}) => {
  return (
    <>
      <h1 className="mt-5 text-center text-2xl font-semibold">
        Scatter Plot Configuration
      </h1>
      <h1 className="text-lg font-semibold">X Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the x-coordinates of the
        x-axis.
      </p>
      <select
        name="preferredXColumn"
        id="scatterPlotOptions"
        value={
          visualizationState &&
          visualizationState.scatterPlotOptions?.preferredXColumn
        }
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
      >
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
        value={
          visualizationState &&
          visualizationState.scatterPlotOptions?.xAxisLabel
        }
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
        className="mb-5 w-full border bg-white p-2 text-sm"
      >
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
        value={
          visualizationState &&
          visualizationState.scatterPlotOptions?.yAxisLabel
        }
        id="scatterPlotOptions"
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
        placeholder="Y Axis Label"
      />
      <h1 className="text-lg font-semibold">Data Point Color</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select a color for the data point.
      </p>
      <HexColorPicker className="my-5" color={color} onChange={setColor} />
    </>
  );
};

export default ScatterPlotOptions;
