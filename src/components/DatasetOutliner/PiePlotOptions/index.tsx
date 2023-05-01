import { color } from "d3";
import { SyntheticEvent, FunctionComponent } from "react";
import { HexColorPicker } from "react-colorful";
import CSVRow from "src/types/csv-row";
import IToolOptions from "src/utils/tool-options";
import ColumnSelectOptions from "../ColumnSelectOptions";

interface Props {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
  handleVisualizationState(e: SyntheticEvent): void;
  pieTrueColor: string;
  setPieTrueColor: React.Dispatch<React.SetStateAction<string>>;
  pieFalseColor: string;
  setPieFalseColor: React.Dispatch<React.SetStateAction<string>>;
}

const PiePlotOptions: FunctionComponent<Props> = ({
  data,
  visualizationState,
  handleVisualizationState,
  pieTrueColor,
  setPieTrueColor,
  pieFalseColor,
  setPieFalseColor,
}) => {
  return (
    <>
      <h1 className="mt-5 text-center text-2xl font-semibold">
        Pie Plot Configuration
      </h1>
      <h1 className="text-lg font-semibold">Data Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the data used in the pie
        plot.
      </p>
      <select
        name="preferredDataColumn"
        id="piePlotOptions"
        value={
          visualizationState &&
          visualizationState.piePlotOptions?.preferredDataColumn
        }
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
      >
        <option value="">Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <h1 className="text-lg font-semibold">Condition</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select a condition to run against the data.
      </p>
      <select
        name="condition"
        id="piePlotOptions"
        value={
          visualizationState && visualizationState.piePlotOptions?.condition
        }
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
      >
        <option value="">Please select a condition</option>
        <option value="GT">Greater Than</option>
        <option value="GTE">Greater Than or Equal To</option>
        <option value="LT">Less Than</option>
        <option value="LTE">Less Than or Equal To</option>
        <option value="EQ">Equal To</option>
        <option value="NE">Not Equal To</option>
      </select>
      <h1 className="text-lg font-semibold">Condition Value</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select a condition to run against the data.
      </p>
      <input
        name="conditionValue"
        id="piePlotOptions"
        type="number"
        value={
          visualizationState && visualizationState.piePlotOptions.conditionValue
        }
        onChange={handleVisualizationState}
        className="mb-5 w-full border bg-white p-2 text-sm"
        placeholder="1"
      />
      <hr />
      <h1>Condition True Color</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select a color to be used for the pie slice that represents when
        the condition is true.
      </p>
      <HexColorPicker
        className="my-5"
        color={pieTrueColor}
        onChange={setPieTrueColor}
      />
      <h1>Condition False Color</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select a color to be used for the pie slice that represents when
        the condition is false.
      </p>
      <HexColorPicker
        className="my-5"
        color={pieFalseColor}
        onChange={setPieFalseColor}
      />
    </>
  );
};
export default PiePlotOptions;
