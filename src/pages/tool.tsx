import { type NextPage } from "next";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";
import { type SyntheticEvent, useRef, useState, useEffect } from "react";
import DatasetOutliner from "src/components/DatasetOutliner";
import axios from "axios";
import type CSVRow from "src/types/csv-row";
import D3Scatter from "src/components/D3Scatter";
import D3Bar from "src/components/D3Bar"
import IToolOptions from "src/utils/tool-options";


const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<CSVRow[] | null>(null);
  const [visualizationState, setVisualizationState] = useState<IToolOptions>(
    {}
  );
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
  return (
    <>
      <main className="relative flex h-screen w-full flex-col">
        <div className="fixed z-50 flex w-full flex-col border-b bg-white">
          <nav className="flex w-full flex-row self-center  bg-white px-3 [&>div]:mx-3 [&>div:nth-child(1)]:ml-0">
            <Dropdown dropdownButtonText="File">
              <button>New Visualization</button>
              <button onClick={openDataset}>Open Dataset</button>
            </Dropdown>
            <Dropdown dropdownButtonText="Edit">
              <button>Undo</button>
              <button>Redo</button>
            </Dropdown>
            <Link href="/dashboard" className="ml-auto">
              Return to Dashboard
            </Link>
          </nav>
        </div>
        <div className="h-[25px] w-full"></div>
        <input
          type="file"
          id="file"
          onChange={handleChange}
          ref={inputFile}
          accept=".xls,.xlsx,.csv, text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          style={{ display: "none" }}
        />
        <div className="flex h-full">
          <DatasetOutliner data={data} visualizationState={visualizationState} handleVisualizationState={handleVisualizationStateChange} />
          <div className="flex flex-col justify-center items-center w-full ml-5">
            {data && visualizationState && visualizationState.visualizationType == "scatter" && <D3Scatter data={data} visualizationState={visualizationState}/>}
          </div>
        </div>
      </main>
    </>
  );
};

export default Tool;
