import { type NextPage } from "next";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";
import { type SyntheticEvent, useRef } from "react";

const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const openDataset = (e: SyntheticEvent) => {
    e.preventDefault()
    if(inputFile.current) {
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
        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
      </main>
    </>
  );
};

export default Tool;
