import Link from "next/link";
import { type FunctionComponent } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const InitialView: FunctionComponent = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#0B546B] via-[#7D244F] to-[#FF8200] text-white">
      <div className="container flex w-full max-w-[1280px] flex-wrap items-center justify-center py-16">
        <div className="flex-col md:mr-10">
          <h1 className="text-lxl font-bold md:text-4xl">
            Sports Visualizations
            <br />
            for {" "}
            <span className="text-[#FF8200]">your </span>
            team.
          </h1>
          <p className="max-w-[350px] py-2 md:py-10 md:text-xl">
            Fanalyzer puts easy, interactive visualizations at your fingertips.
          </p>
          <button
            onClick={() => signIn()}
            className="rounded-md bg-[#FF8200] py-2 px-6 shadow-sm md:py-4 md:px-12 md:text-2xl"
          >
            Sign Up
          </button>
        </div>
        <Image
          src="init_view.svg"
          alt="Initial view image"
          width={100}
          height={100}
          className="ml-auto h-[400px]  w-[400px]"
        />
      </div>
    </div>
  );
};

export default InitialView;
