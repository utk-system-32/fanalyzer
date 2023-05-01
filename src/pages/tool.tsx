import { type NextPage } from "next";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";
import React, { type SyntheticEvent, useRef, useState, useEffect } from "react";
import DatasetOutliner from "src/components/DatasetOutliner";
import axios from "axios";
import type CSVRow from "src/types/csv-row";
import D3Scatter from "src/components/D3Scatter";
import D3Bar from "src/components/D3Bar";
import D3Histogram from "src/components/D3Histogram";
import D3Pie from "src/components/D3Pie";
import type IToolOptions from "src/utils/tool-options";
import { api } from "../utils/api";

const DEFAULT_VISUALIZATION_VALUES = {
  visualizationWidth: 500,
  visualizationHeight: 500,
  visualizationTitle: "Visualization Title",
  scatterPlotOptions: {
    xAxisLabel: "X Axis",
    yAxisLabel: "Y Axis",
    dataPointColor: "#ff8200",
    preferredXColumn: "",
    preferredYColumn: "",
  },
  barPlotOptions: {
    xAxisLabel: "X Axis",
    yAxisLabel: "Y Axis",
    dataPointColor: "#ff8200",
    preferredXColumn: "",
    preferredYColumn: "",
  },
  histPlotOptions: {
    xAxisLabel: "X Axis",
    yAxisLabel: "Frequency",
    dataPointColor: "#ff8200",
    preferredDataColumn: "",
  },
  piePlotOptions: {
    preferredDataColumn: "",
    condition: "",
    conditionValue: 0,
    trueConditionColor: "#ff8200",
    falseConditionColor: "#eaeaea",
  },
};

const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<CSVRow[] | null>(null);
  const [visualizationState, setVisualizationState] = useState<IToolOptions>(
    DEFAULT_VISUALIZATION_VALUES
  );
  const createVisualizationMutation =
    api.visualization.createVisualization.useMutation();
  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("CALLING HANDLE CHANGE");
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.files) {
        setFile(e.currentTarget.files[0]);
      }
    }
  };

  const handleVisualizationStateChange = (e: SyntheticEvent) => {
    e.persist();
    if (
      e.currentTarget instanceof HTMLInputElement ||
      e.currentTarget instanceof HTMLSelectElement
    ) {
      const target = e.currentTarget;
      if (target.id) {
        setVisualizationState((visualizationState) => ({
          ...visualizationState,
          [target.id]: {
            ...visualizationState[target.id],
            [target.name]: target.value,
          },
        }));
      }
      setVisualizationState((visualizationState) => ({
        ...visualizationState,
        [target.name]: target.value,
      }));
    }
  };

  const openDataset = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  useEffect(() => {
    if (file != undefined) {
      console.log("FILE IS NOT UNDEFINED");
      const fd = new FormData();
      fd.append("file", file);
      axios
        .post("/api/dataset/load", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) =>
          //TODO: Error handling here. Check response status before setting data.
          setData(JSON.parse(res.data.data))
        )
        .catch((error) => console.error(error));
    }
  }, [file]);
  const handleCreateVisualization = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //FIXME: This needs to check if a visualization actually exists and has a title.
    if (
      visualizationState &&
      visualizationState.visualizationTitle &&
      visualizationState.visualization
    ) {
      createVisualizationMutation.mutate({
        title: visualizationState.visualizationTitle,
        data: visualizationState.visualization,
      });
    } else {
      alert("missing required parameters");
    }
  };
  return (
    <>
      <main className="relative flex h-screen w-full flex-col">
        <div className="z-50 flex w-full flex-col border-b bg-white">
          <nav className="flex w-full flex-row items-center self-center  bg-white px-3 [&>div]:mx-3 [&>div:nth-child(1)]:ml-0">
            <button onClick={openDataset}>Open Dataset</button>
            <button
              className="my-2 ml-auto rounded bg-[#ff8200] p-2 font-semibold text-white"
              onClick={handleCreateVisualization}
            >
              Create Visualization
            </button>
            <Link href="/dashboard" className="ml-5">
              Return to Dashboard
            </Link>
          </nav>
        </div>
        <input
          type="file"
          id="file"
          onChange={handleChange}
          ref={inputFile}
          accept=".csv, text/csv"
          style={{ display: "none" }}
        />
        <div className="flex h-full bg-gray-100">
          <DatasetOutliner
            data={data}
            setVisualizationState={setVisualizationState}
            visualizationState={visualizationState}
            handleVisualizationState={handleVisualizationStateChange}
          />
          <div className="ml-5 flex w-full flex-col items-center justify-center">
            {data &&
              visualizationState &&
              visualizationState.visualizationType == "scatter" && (
                <D3Scatter
                  data={data}
                  visualizationState={visualizationState}
                  setVisualizationState={setVisualizationState}
                />
              )}
            {data &&
              visualizationState &&
              visualizationState.visualizationType == "bar" && (
                <D3Bar
                  data={data}
                  visualizationState={visualizationState}
                  setVisualizationState={setVisualizationState}
                />
              )}
            {data &&
              visualizationState &&
              visualizationState.visualizationType == "histogram" && (
                <D3Histogram
                  data={data}
                  visualizationState={visualizationState}
                  setVisualizationState={setVisualizationState}
                />
              )}
            {data &&
              visualizationState &&
              visualizationState.visualizationType == "pie" && (
                <D3Pie
                  data={data}
                  visualizationState={visualizationState}
                  setVisualizationState={setVisualizationState}
                />
              )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Tool;
