import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Register: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#7d244f] to-[#ff8200]">
      <Head>
        <title>Register for Fanalyzer | Fanalyzer</title>
        <meta name="description" content="Sign up for Fanalyzer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        className="flex min-h-[500px] w-full max-w-[600px] flex-col rounded-md bg-white p-5 shadow-lg"
        method="POST"
      >
        <Link href="/" className="text-[#ff8200]">
          Go back
        </Link>
        <h1 className="text-bold text-center text-3xl">
          Register for Fanalyzer
        </h1>
        <label className="mt-5" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="mt-2 rounded-md border p-2"
          name="username"
          placeholder="Username"
        />
        <label className="mt-5" htmlFor="username">
          Email
        </label>
        <input
          type="email"
          className="mt-2 rounded-md border p-2"
          name="email"
          placeholder="Email"
        />
        <label className="mt-5" htmlFor="username">
          Password
        </label>
        <input
          type="password"
          className="mt-2 rounded-md border p-2"
          name="username"
          placeholder="Password"
        />
        <button
          type="submit"
          className="text-bold mt-auto mb-1 w-full rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
