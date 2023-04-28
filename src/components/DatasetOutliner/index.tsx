import {
  type SyntheticEvent,
  useState,
  useEffect,
  type FunctionComponent,
} from "react";
import React from "react";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
import { HexColorPicker } from "react-colorful";
interface Props {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
  setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>;
  handleVisualizationState(e: SyntheticEvent): void;
}
interface CSOProps {
  data?: CSVRow[] | null;
}

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

const DatasetOutliner: FunctionComponent<Props> = ({
  data,
  visualizationState,
  setVisualizationState,
  handleVisualizationState,
}) => {
  const [color, setColor] = useState("#ff8200");
  useEffect(() => {
    if (visualizationState?.visualizationType == "scatter") {
      setVisualizationState((visualizationState: IToolOptions) => ({
        ...visualizationState,
        ["scatterPlotOptions"]: {
          ...visualizationState["scatterPlotOptions"],
          dataPointColor: color,
        },
      }));
    }
    if (visualizationState?.visualizationType == "bar") {
      setVisualizationState((visualizationState: IToolOptions) => ({
        ...visualizationState,
        ["barPlotOptions"]: {
          ...visualizationState["barPlotOptions"],
          dataPointColor: color,
        },
      }));
    }
  }, [color, setVisualizationState]);
  return (
    <section className="h-full min-w-[300px] overflow-y-scroll border-r bg-white px-3">
      {data && (
        <>
          {" "}
          <p className="font-semibold text-green-400">
            Dataset loaded. Use the options below to customize your
            visualization.
          </p>
          <hr />
        </>
      )}
      {!data && (
        <>
          {" "}
          <p className="font-semibold text-red-400">
            Dataset not loaded. Please load a dataset using the File menu above.
          </p>
          <hr />
        </>
      )}
      {data && (
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
      )}
      {visualizationState &&
        visualizationState.visualizationType == "scatter" && (
          <>
            <h1 className="mt-5 text-center text-2xl font-semibold">
              Scatter Plot Configuration
            </h1>
            <h1 className="text-lg font-semibold">X Column</h1>
            <p className="mb-2 text-sm font-light text-gray-500">
              Please select the column that will represent the x-coordinates of
              the x-axis.
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
              Please select the column that will represent the y coordinates on
              the y-axis.
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
            <HexColorPicker
              className="my-5"
              color={color}
              onChange={setColor}
            />
          </>
        )}
      {visualizationState && visualizationState.visualizationType == "bar" && (
        <>
          <h1 className="mt-5 text-center text-2xl font-semibold">
            Bar Plot Configuration
          </h1>
          <h1 className="text-lg font-semibold">X Column</h1>
          <p className="mb-2 text-sm font-light text-gray-500">
            Please select the column that will represent the x-coordinates of
            the x-axis.
          </p>
          <select
            name="preferredXColumn"
            id="barPlotOptions"
            value={
              visualizationState &&
              visualizationState.barPlotOptions?.preferredXColumn
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
              visualizationState.barPlotOptions?.xAxisLabel
            }
            id="barPlotOptions"
            onChange={handleVisualizationState}
            className="mb-5 w-full border bg-white p-2 text-sm"
            placeholder="X Axis Label"
          />
          <h1 className="text-lg  font-semibold">Y Column</h1>
          <p className="mb-2 text-sm font-light text-gray-500">
            Please select the column that will represent the y coordinates on
            the y-axis.
          </p>
          <select
            name="preferredYColumn"
            value={visualizationState?.barPlotOptions?.preferredYColumn}
            id="barPlotOptions"
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
              visualizationState.barPlotOptions?.yAxisLabel
            }
            id="barPlotOptions"
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
      )}
      {visualizationState &&
        visualizationState.visualizationType == "histogram" && (
          <>
            <h1 className="mt-5 text-center text-2xl font-semibold">
              Histogram Configuration
            </h1>
            <h1 className="text-lg font-semibold">X Column</h1>
            <p className="mb-2 text-sm font-light text-gray-500">
              Please select the column that will represent the x-coordinates of
              the x-axis.
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
              Please select the column that will represent the y coordinates on
              the y-axis.
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
            <HexColorPicker
              className="my-5"
              color={color}
              onChange={setColor}
            />
          </>
        )}
      <hr />
    </section>
  );
};

export default DatasetOutliner;
