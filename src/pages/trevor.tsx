import { type NextPage } from "next";
import Head from "next/head";
const TrevorAboutPage: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <section className="w-full max-w-screen-xl self-center">
        <h1 className="mt-5 text-5xl font-bold text-white">Hi, I'm Trevor.</h1>
        <p className="mt-5 text-xl text-white">I'm...</p>
        <ul className="ml-5 list-disc text-xl text-white">
          <li>
            A senior undergrad majoring in Computer Science at{" "}
            <span className="text-orange-500">UTK</span>.
          </li>
          <li>
            A network engineer at <span className="text-blue-800">TVA</span>.
          </li>
          <li>
            A co-director for the UTK chapter of{" "}
            <span className="text-blue-500">Hack4Impact</span>.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default TrevorAboutPage;
