import { type NextPage } from "next";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";
import { type SyntheticEvent, useRef, useState } from "react";
import DatasetOutliner from "src/components/DatasetOutliner";
import axios from "axios";

const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.files) {
        setFile(e.currentTarget.files[0]);
      }
    }
    const fd = new FormData();
    if (file != undefined) fd.append("file", file);
    const res = axios.post("/api/dataset/load", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  const openDataset = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
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
          style={{ display: "none" }}
        />
      </main>
    </>
  );
};

export default Tool;
