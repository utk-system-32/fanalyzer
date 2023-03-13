import Head from "next/head";
import { type ReactNode, type FunctionComponent } from "react";
import Footer from "../Footer";
import Header_Dashboard from "../Header_Dashboard";

interface Props {
  children?: ReactNode;
  pageTitle: string;
  metaDescription: string;
}

const Layout_Dashboard: FunctionComponent<Props> = ({
  children,
  pageTitle,
  metaDescription,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen w-full  flex-col items-center">
        <Header_Dashboard />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout_Dashboard;