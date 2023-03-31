import {
  type MutableRefObject,
  type SyntheticEvent,
  type FunctionComponent,
} from "react";
import Dropdown from "src/components/tool/ToolHeader/Dropdown";
import Link from "next/link";
import type IToolOptions from "src/types/tool-options";

interface Props {
  openDataset(e: SyntheticEvent): void;
  inputFile: MutableRefObject<HTMLInputElement | null>;
  handleChange(e: SyntheticEvent): void;
  visualizationState?: IToolOptions;
  handleVisualizationState(e: SyntheticEvent): void;
}
const ToolHeader: FunctionComponent<Props> = ({
  openDataset,
  inputFile,
  handleChange,
}) => {
  return (
    <>
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
        <input
          type="file"
          id="file"
          onChange={handleChange}
          ref={inputFile}
          accept=".xls,.xlsx,.csv, text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          style={{ display: "none" }}
        />
      </div>
      <div className="h-[25px] w-full"></div>
    </>
  );
};

export default ToolHeader;
