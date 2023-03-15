import { type NextPage } from "next";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";
import { type SyntheticEvent, useRef, useState, useEffect } from "react";
import DatasetOutliner from "src/components/DatasetOutliner";
import axios from "axios";

const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState(null);
  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.files) {
        setFile(e.currentTarget.files[0]);
      }
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
        .then((res) => console.log("response: ", res))
        .catch((error) => console.error(error));
    }
  }, [file]);
  return (
    <>
      <main className="flex w-full flex-col">
        <div className="flex w-full flex-col border-b">
          <nav className="flex w-full max-w-[1280px] flex-row self-center  [&>div]:mx-3">
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
        <DatasetOutliner file={file} />
        <input
          type="file"
          id="file"
          onChange={handleChange}
          ref={inputFile}
          accept=".xls,.xlsx,.csv, text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          style={{ display: "none" }}
        />
      </main>
    </>
  );
};

export default Tool;
