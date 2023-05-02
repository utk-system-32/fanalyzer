import Head from "next/head";
import { type ReactNode, type FunctionComponent, useState } from "react";
import Footer from "../Footer";
import Header_Dashboard from "../Header_Dashboard";
import CreatePost from "src/components/CreatePost";
import ForceLogin from "src/components/ForceLogin";

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
        <meta name="viewport" content="width=1024" />
        <link rel="icon" href="/runtransparent.png" />
      </Head>
      <main className="relative flex min-h-screen w-full  flex-col items-center">
        <ForceLogin>
          <Header_Dashboard handleCreatePostClick={handleCreatePostClick}/>
          <CreatePost popupOpen={showCreatePost} setPopupOpen={setShowCreatePost}/>
          {children}
          <Footer />
        </ForceLogin>
      </main>
    </>
  );
};

export default Layout_Dashboard;