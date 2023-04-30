import {
  type SyntheticEvent,
  useState,
  useEffect,
  type FunctionComponent,
} from "react";
import React from "react";
import type CSVRow from "src/types/csv-row";
import type IToolOptions from "src/utils/tool-options";
import VisualizationOptions from "./VisualizationOptions";
import ScatterPlotOptions from "./ScatterPlotOptions";
import BarPlotOptions from "./BarPlotOptions";
import HistogramPlotOptions from "./HistogramPlotOptions";
interface Props {
  data?: CSVRow[] | null;
  visualizationState?: IToolOptions;
  setVisualizationState: React.Dispatch<React.SetStateAction<IToolOptions>>;
  handleVisualizationState(e: SyntheticEvent): void;
}

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
    if (visualizationState?.visualizationType == "histogram") {
      setVisualizationState((visualizationState: IToolOptions) => ({
        ...visualizationState,
        ["histPlotOptions"]: {
          ...visualizationState["histPlotOptions"],
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
        <VisualizationOptions
          visualizationState={visualizationState}
          handleVisualizationState={handleVisualizationState}
        />
      )}
      {visualizationState &&
        visualizationState.visualizationType == "scatter" && (
          <ScatterPlotOptions
            data={data}
            visualizationState={visualizationState}
            handleVisualizationState={handleVisualizationState}
            color={color}
            setColor={setColor}
          />
        )}
      {visualizationState && visualizationState.visualizationType == "bar" && (
        <BarPlotOptions
          data={data}
          visualizationState={visualizationState}
          handleVisualizationState={handleVisualizationState}
          color={color}
          setColor={setColor}
        />
      )}
      {visualizationState &&
        visualizationState.visualizationType == "histogram" && (
          <HistogramPlotOptions
            data={data}
            visualizationState={visualizationState}
            handleVisualizationState={handleVisualizationState}
            color={color}
            setColor={setColor}
          />
        )}
      <hr />
    </section>
  );
};

export default DatasetOutliner;
