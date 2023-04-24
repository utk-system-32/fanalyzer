import Head from "next/head";
import { type ReactNode, type FunctionComponent, useState } from "react";
import Footer from "../Footer";
import Header_Dashboard from "../Header_Dashboard";
import CreatePost from "src/components/CreatePost";

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
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
  };
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen w-full  flex-col items-center">
        <Header_Dashboard handleCreatePostClick={handleCreatePostClick}/>
        <CreatePost popupOpen={showCreatePost} setPopupOpen={setShowCreatePost}/>
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout_Dashboard;