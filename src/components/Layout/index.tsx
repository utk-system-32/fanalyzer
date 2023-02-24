import Head from "next/head";
import { type ReactNode, type FunctionComponent } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface Props {
  children?: ReactNode;
  pageTitle: string;
  metaDescription: string;
}

const Layout: FunctionComponent<Props> = ({
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
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
