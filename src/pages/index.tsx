import { type NextPage } from "next";
import Header from "../components/Header";
import Animate from "../components/Animate";
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
      <div className="mx-10">
      <Animate>
        <div className="container flex min-h-[500px] w-full max-w-[1280px] flex-wrap items-center self-center py-5">
          <div className="w-1/2 flex-col">
            <h1 className="py-1 text-2xl font-bold md:text-4xl">
              Data Visualizations made{" "}
              <span className="text-[#FF8200]">easy.</span>
            </h1>
            <p className="pb-1 text-xl">
              Fanalyzer allows coaches to input team or individual player data, create
              visualizations, and share them with
              their team.
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
        <div className="container flex min-h-[500px] w-full max-w-[1280px] flex-wrap-reverse items-center justify-center self-center">
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
              Our visualization tools will help you efficiently share data that is visually pleasing and insightful.
            </p>
          </div>
        </div>
      </Animate>

      <Animate>
        <div className="container flex min-h-[500px] w-full max-w-[1280px] items-center justify-center self-center text-center">
          <div className="flex flex-col">
            <h2 className="flex self-center py-10 text-center text-3xl font-bold">
              Visualization Types
            </h2>
            <div className="grid grid-cols-4 gap-10">
              <div className="flex flex-col items-center text-2xl">
                <Image 
                  src = "/scatterplot.svg" 
                  alt = "scatter plot icon"
                  width = {200}
                  height = {200}
                  className="h-10 w-10 flex-col md:h-20 md:w-20" />
                <span>Scatterplot</span>
              </div>
              <div className="flex flex-col items-center text-2xl">
                <Image
                  src = "/bargraph.svg"
                  alt = "bar graph icon"
                  width = {200}
                  height = {200}
                  className="h-10 w-10 flex-col md:h-20 md:w-20" />
                Bar Graph
              </div>
              <div className="flex flex-col items-center text-2xl">
                <Image 
                  src = "/histogram.svg"
                  alt = "histogram icon"
                  width = {200}
                  height = {200}
                  className="h-10 w-10 flex-col md:h-20 md:w-20" />
                Histogram
              </div>
              <div className="flex flex-col items-center text-2xl">
                <Image
                  src = "/piechart.svg"
                  alt = "pie chart icon"
                  width = {200}
                  height = {200}
                  className="h-10 w-10 flex-col md:h-20 md:w-20" />
                Pie Chart
              </div>
            </div>
          </div>
        </div>
      </Animate>
      </div>
    </Layout>
  );
};

export default Home;