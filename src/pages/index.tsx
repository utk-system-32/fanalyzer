import { type NextPage } from "next";
import Header from "../components/Header";
import Animate from "../components/animate";
import InitialView from "../components/InitialView";
import Layout from "../components/Layout";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <Layout
      pageTitle="Sports Visualizations Made Easy | Fanalyzer"
      metaDescription="Fanalyzer is a tool to create visualizations of sports data."
    >
      <Header />
      <InitialView />
      <Animate>
        <div className="container flex min-h-screen w-full max-w-[1280px] flex-wrap items-center self-center py-5">
          <div className="w-1/2 flex-col">
            <h1 className="py-1 text-2xl font-bold md:text-4xl">
              Data Visualizations made{" "}
              <span className="text-[#FF8200]">easy.</span>
            </h1>
            <p className="pb-1 text-xl">
              Fanalyzer allows you to input your own sports data, create
              visualizations with our visualizations tool, and share them with
              other people.
            </p>
          </div>
          <Image
            src="home_page1.svg"
            alt="Data visualization"
            width={100}
            height={100}
            className=" h-[400px]  w-[400px] flex-col md:ml-auto"
          />
        </div>
      </Animate>

      <Animate>
        <div className="container flex min-h-screen w-full max-w-[1280px] flex-wrap-reverse items-center justify-center self-center">
          <Image
            src="home_page2.svg"
            alt="Data visualization"
            width={100}
            height={100}
            className=" h-[400px]  w-[400px] flex-col md:mr-auto"
          />
          <div className="w-1/2 flex-col md:ml-10 ">
            <h1 className="py-1  text-3xl font-bold">
              <span className="text-[#FF8200]">Interactive</span> visualizations
              for your sports data
            </h1>
            <p className="pb-1 text-xl">
              Use our visualization tools to manipulate your data and graphs to
              create insightful visualizations to share.
            </p>
          </div>
        </div>
      </Animate>

      <Animate>
        <div className="container flex min-h-screen w-full max-w-[1280px] items-center justify-center self-center text-center">
          <div className="flex flex-col">
            <h2 className="flex self-center py-10 text-center text-3xl font-bold">
              Visualization Types
            </h2>
            <div className="grid grid-cols-4 gap-10">
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                <span>V1</span>
              </div>
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                V2
              </div>
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                V3
              </div>
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                V4
              </div>
            </div>
          </div>
        </div>
      </Animate>

      <Animate>
        <div className="container flex min-h-screen w-full max-w-[1280px] items-center justify-center self-center text-center">
          <div className="flex flex-col">
            <h1 className="text-md py-10 text-3xl font-bold">
              Supported Data Formats<br></br>
            </h1>
            <div className="grid grid-cols-4 gap-10">
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                CSV
              </div>
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                XLSX
              </div>
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                JSON
              </div>
              <div className="flex flex-col items-center text-2xl">
                <div className="h-10 w-10 flex-col bg-gray-400 md:h-20 md:w-20" />
                XML
              </div>
            </div>
          </div>
        </div>
      </Animate>
    </Layout>
  );
};

export default Home;
