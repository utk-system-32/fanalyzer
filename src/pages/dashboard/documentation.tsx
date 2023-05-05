import { type NextPage } from "next";
import Layout_Dashboard from "../../components/Layout_Dashboard";
import DashboardSidebar from "src/components/DashboardSidebar";
import Image from "next/image";

const Documentation: NextPage = () => {
  return (
      
  <Layout_Dashboard
    pageTitle="Documentation | Fanalyzer"
    metaDescription="Learn about how to use Fanalyzer."
  >
  <DashboardSidebar page="documentation" />

      <div className="container p-4 ml-[360px]">
        <h1 className="title mb-6 text-4xl bold">Welcome to Fanalyzer</h1>
        <p className="text-1xl description ml-2 mt-3 mb-3">
          Fanalyzer is a tool for data-analysis and sharing insights. Using CSV
          datasets Fanalyzer generates data visualizations allowing you to draw
          and share conclusions based on your data.
        </p>

        <section className="section">
          <h2 className="subtitle mb-4 mt-4 text-3xl">Getting Started:</h2>
          <p className="text-1xl ml-2 mt-3 mb-3">
            Let's get started by creating your first visualization and making
            your first post! Opening up your user dashboard you will be
            directed to your "Creations" tab. Here you will find the collection
            of your data visualizations. Right now it's probably empty, but we
            will soon fix that.
          </p>
          <div className="image-container p-2">
            <Image
              src="/emptycreations.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mb-3 mt-3">
            Go ahead and click "Create Visualization" to get started.
          </p>
        </section>

        <section className="section">
          <h2 className="subtitle mb-4 mt-4 text-3xl">Creating Visualizations:</h2>
          <p className="text-1xl ml-2 mb-3 mt-3">
            When you want to create a visualization you will use the
            visualization web tool. The web tool allows you to create charts and
            graphs based on CSV datasets you provide. Let's create a
            visualization based on an example dataset.
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage0.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mt-3 mb-3">
            Click on "Open Dataset". Use the file explorer to locate and select
            a file you would like to use. Only CSV files are supported. We will
            use a file called "pass_leaders.csv".
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage1.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mb-3 mt-3">
            When you successfully load your dataset you will be provided with a
            number of options on the left-hand side. Use the sidebar to first
            select the type of graph/chart you would like to use. Let's select a
            scatter plot for now.
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage2.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mt-3 mb-3 p-2">
            When you select your visualization type you will notice your
            workspace appear at the right.
          </p>
          <div className="image-container">
            <Image
              src="/toolpage3.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mt-3 mb-3">
            You can use this time to adjust the width and height of your visualization.
            You can change the title as it appears at the top of the graph as well.
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage4.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mt-3 mb-3">
            You will have different options for your data parameters depending on the type of visualization
            you select. For scatter plots, you can select which column of data in your CSV that you would
            like to represent the X and Y axes.
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage5.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mt-3 ml-3">
            Here we've selected which columns of data we want to compare. The tool automatically plots
            that comparison and we can also change the label for the axes and the color we want the data
            plots to be.

            When you think your creation is ready you can go ahead and click "Create Visualization"
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage6.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mt-3 mb-3">
            Clicking "Create Visualization" will save your data plot and take you back to your creations
            tab, where you can now see your graph saved to your account.

            Now that we've learned how to do data-analysis and visualization, how do we make use of that
            information?
          </p>
        </section>

        <section className="section">
          <h2 className="subtitle mb-4 mt-4 text-3xl">Posts and Sharing:</h2>
          <p className="text-1xl ml-2 mb-2">
            Once you have a visualization completed and saved you are ready to make a post to the site.
          </p>
          <div className="image-container p-2">
            <Image
              src="/toolpage7.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mb-3 mt-3">
            Clicking on "Create Post" will open the post editor window.
          </p>
          <div className="image-container p-2">
          <Image
              src="/postwindow0.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mb-3 mt-3">
            Here we can select any of our saved visualizations and then add a title and description to our post.
          </p>
          <div className="image-container p-2">
          <Image
              src="/postwindow1.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mb-3 mt-3">
          When you are ready to post go ahead and click "Create Post" to post it to your account.\n
          </p>
          <div className="image-container p-2">
          <Image
              src="/account0.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p className="text-1xl ml-2 mb-3 mt-3">
            Posts you make are viewable to you under your "My Account" tab in the dashboard.
          </p>
        </section>
      </div>
    
    </Layout_Dashboard>

    
  );
};

export default Documentation;
