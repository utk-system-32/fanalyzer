import { type NextPage } from "next";
import { type SyntheticEvent, useRef, useState, useEffect } from "react";
import DatasetOutliner from "src/components/tool/DatasetOutliner";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import type CSVRow from "src/types/csv-row";
import ScatterPlot from "src/components/tool/visualizations/ScatterPlot";
import { CameraControls } from "@react-three/drei";
import ToolHeader from "src/components/tool/ToolHeader";
import type IToolOptions from "src/types/tool-options";

const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<CSVRow[] | null>(null);
  const [visualizationState, setVisualizationState] = useState<IToolOptions>(
    {}
  );
  //Changing the uploaded dataset file
  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
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
      setVisualizationState((visualizationState) => ({
        ...visualizationState,
        [target.name]: target.value,
      }));
    }
  };
  //Open the file select field when clicking the "Open Dataset" button
  const openDataset = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  //Send the dataset file to the backend to be parsed into JSON.
  useEffect(() => {
    if (file != undefined) {
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
  console.log(visualizationState);
  return (
    <>
      <main className="relative flex h-screen w-full flex-col">
        <ToolHeader
          inputFile={inputFile}
          openDataset={openDataset}
          handleChange={handleChange}
          visualizationState={visualizationState}
          handleVisualizationState={handleVisualizationStateChange}
        />
        <div className="flex h-full">
          <DatasetOutliner
            data={data}
            visualizationState={visualizationState}
            handleVisualizationState={handleVisualizationStateChange}
          />
          <div className="h-full w-full">
            <Canvas className="bg-gray-100">
              <ambientLight intensity={0.1} />
              <CameraControls />
              {visualizationState?.visualizationType == "scatter" && (
                <ScatterPlot xData={[]} yData={[]} />
              )}
            </Canvas>
          </div>
        </div>
      </main>
    </>
  );
};

export default Tool;
