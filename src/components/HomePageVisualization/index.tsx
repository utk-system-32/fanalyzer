import { type FunctionComponent, useRef, useEffect } from "react";

const HomePageVisualization: FunctionComponent = () => {
  const visRef = useRef(null);

  useEffect(() => {
    console.log("TESTING");
  }, []);
  return (
    <section className="flex min-h-[600px] flex-col">
      <h2 className="flex self-center py-10 text-center text-3xl font-bold">
        Try a Visualization!
      </h2>
      <p className="pb-1 text-center text-xl">
        Use the options below to sample our visualization creation tool!
      </p>
      <svg ref={visRef}></svg>
    </section>
  );
};

export default HomePageVisualization;
