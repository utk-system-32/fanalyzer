import { type NextPage } from "next";
import Layout_Dashboard from "../components/Layout_Dashboard";
import Head from "next/head";
import { title } from "process";
import Image from "next/image";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";

const Tool: NextPage = () => {
  return (
    <main className="flex w-full flex-col">
      <div className="flex w-full flex-col border-b">
        <nav className="flex w-full max-w-[1280px] flex-row self-center  [&>div]:mx-3">
          <Dropdown dropdownButtonText="File">
            <button>New Visualization</button>
            <button>Open Dataset</button>
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
    </main>
  );
};

export default Tool;
