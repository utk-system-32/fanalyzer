import { type SyntheticEvent, type FunctionComponent } from "react";
import { HexColorPicker } from "react-colorful";
import ColumnSelectOptions from "../ColumnSelectOptions";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";

interface Props {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
  handleVisualizationState(e: SyntheticEvent): void;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
const HistogramPlotOptions: FunctionComponent<Props> = ({
  data,
  visualizationState,
  handleVisualizationState,
  color,
  setColor,
}) => {
  return (
    <>
      <h1 className="mt-5 text-center text-2xl font-semibold">
        Histogram Configuration
      </h1>
      <h1 className="text-lg font-semibold">X Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the x-coordinates of the
        x-axis.
      </p>
      <select
        name="preferredDataColumn"
        id="histPlotOptions"
        value={
          visualizationState &&
          visualizationState.histPlotOptions?.preferredDataColumn
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
          visualizationState && visualizationState.histPlotOptions?.xAxisLabel
        }
        id="histPlotOptions"
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
        placeholder="X Axis Label"
      />
      <h1 className="text-lg font-semibold">Y-Axis Label</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please enter a label for the the y-axis.
      </p>
      <input
        name="yAxisLabel"
        type="text"
        value={
          visualizationState && visualizationState.histPlotOptions?.yAxisLabel
        }
        id="histPlotOptions"
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

export default HistogramPlotOptions;
