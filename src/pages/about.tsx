import { type NextPage } from "next";
import Layout from "../components/Layout";
import blaine_img from '../../public/images/blaine.jpg'
import trevor_img from '../../public/images/trevor.jpg'
import nolan_img from '../../public/images/nolan.jpg'
import suhil_img from '../../public/images/suhil.jpg'
import jake_img from '../../public/images/jake.jpg'
import About from "../components/About"

const AboutPage: NextPage = () => {
  return (
    <Layout
      pageTitle="About | Fanalyzer"
      metaDescription="Learn about the team that made Fanalyzer."
    >
    <About
      name="Blaine Liuag"
      image={blaine_img}
      role="Team Lead, Developer"
      email="bliuag@vols.utk.edu"
      />
    <About
      name="Trevor Mangrum"
      image={trevor_img}
      role="Project Manager, Developer"
      email="tmangrum@vols.utk.edu"
      />
      <About
      name="Nolan Askew"
      image={nolan_img}
      role="Treasurer, Developer"
      email="naskew@vols.utk.edu"
      />
      <About
      name="Suhil Suresh"
      image={suhil_img}
      role="Developer"
      email="ssuresh6@vols.utk.edu"
      />
      <About
      name="Jake Woodard"
      image={jake_img}
      role="Developer"
      email="kwooda13@vols.utk.edu"
      />
    </Layout>
  );
};

export default AboutPage;
