import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { AppProps } from "next/app";

const Register: NextPage = ({ providers }: { providers: AppProps}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#7d244f] to-[#ff8200]">
      <Head>
        <title>Register for Fanalyzer | Fanalyzer</title>
        <meta name="description" content="Sign up for Fanalyzer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-[500px] w-full max-w-[600px] flex-col rounded-md bg-white p-5 shadow-lg">
          <Link href="/" className="text-[#ff8200]">
            Go back
          </Link>
          <h1 className="text-center text-3xl font-bold">
            Register for Fanalyzer
          </h1>
        <div className="flex items-center justify-center mt-20">
            {Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                className="text-bold mt-auto mb-1 w-full rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: `${window.location.origin}/dashboard`,
                  })
                }
                >
                  Register or Sign in with Google
              </button>
            ))}
          </div>
      </div>
    </main>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async() => {
  const providers = await getProviders();
  return {
    props: {providers},
  };
};