import { type NextPage } from "next";
import Layout from "../components/Layout";
import Head from "next/head";
import { title } from "process";
import Image from "next/image";

const Tool: NextPage = () => {
  return (
    <Layout
      pageTitle="Graphing Tool"
      metaDescription="Out-graph the competition."
    >
      <div className="container flex min-h-[400] w-full max-w-[1280px] flex-wrap items-center self-center py-5">
        <div className="container flex items-center self-center">
          <button
            type = "submit"
            className = "text-bold mt-auto mb-1 w-full rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
          >
            Upload File
          </button>
          <h1 className="text-center text-sm">
            Input Columns
          </h1>
          <input
            type = "text"
            className="mt-2 rounded-md border p-2 w-75"
            placeholder="X-axis column name"
          >
          </input>
          <input
            type = "text"
            className="mt-2 rounded-md border p-2 w-75"
            placeholder="Y-axis column name"
          >
          </input>
        </div>
        <div className="container flex w-full max-w-[1280px] items-center self-center py-2">
          <Image
            src="home_page1.svg"
            alt="Data visualization"
            width={200}
            height={200}
            className=" flex h-[100px]  w-[100px] md:ml-auto pl-1 items-center self-center"
          />
          <button
            type = "submit"
            className = "text-bold mt-auto mb-1 self-center w-100 rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]" 
          >
            Create Scatterplot
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Tool;