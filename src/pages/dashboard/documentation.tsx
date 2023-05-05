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

      <div className="container">
        <h1 className="title">Welcome to Fanalyzer</h1>
        <p className="description">
          Fanalyzer is a tool for data-analysis and sharing insights. Using CSV
          datasets Fanalyzer generates data visualizations allowing you to draw
          and share conclusions based on your data.
        </p>

        <section className="section">
          <h2 className="subtitle">Getting Started:</h2>
          <p>
            Let's get started by creating your first visualization and making
            your first post! Opening up your user dashboard you will be
            directed to your "Creations" tab. Here you will find the collection
            of your data visualizations. Right now it's probably empty, but we
            will soon fix that.
          </p>
          <div className="image-container">
            <Image
              src="/emptycreations.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
            Go ahead and click "Create Visualization" to get started.
          </p>
        </section>

        <section className="section">
          <h2 className="subtitle">Creating Visualizations:</h2>
          <p>
            When you want to create a visualization you will use the
            visualization web tool. The web tool allows you to create charts and
            graphs based on CSV datasets you provide. Let's create a
            visualization based on an example dataset.
          </p>
          <div className="image-container">
            <Image
              src="/toolpage0.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
            Click on "Open Dataset". Use the file explorer to locate and select
            a file you would like to use. Only CSV files are supported. We will
            use a file called "pass_leaders.csv".
          </p>
          <div className="image-container">
            <Image
              src="/toolpage1.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
            When you successfully load your dataset you will be provided with a
            number of options on the left-hand side. Use the sidebar to first
            select the type of graph/chart you would like to use. Let's select a
            scatter plot for now.
          </p>
          <div className="image-container">
            <Image
              src="/toolpage2.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
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
          <p>
            You can use this time to adjust the width and height of your visualization.
            You can change the title as it appears at the top of the graph as well.
          </p>
          <div className="image-container">
            <Image
              src="/toolpage4.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
            You will have different options for your data parameters depending on the type of visualization
            you select. For scatter plots, you can select which column of data in your CSV that you would
            like to represent the X and Y axes.
          </p>
          <div className="image-container">
            <Image
              src="/toolpage5.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
            Here we've selected which columns of data we want to compare. The tool automatically plots
            that comparison and we can also change the label for the axes and the color we want the data
            plots to be.

            When you think your creation is ready you can go ahead and click "Create Visualization"
          </p>
          <Image
              src="/toolpage6.png"
              alt="image description"
              width={500}
              height={314}
            />
          <p>
            Clicking "Create Visualization" will save your data plot and take you back to your creations
            tab, where you can now see your graph saved to your account.

            Now that we've learned how to do data-analysis and visualization, how do we make use of that
            information?
          </p>
        </section>

        <section className="section">
          <h2 className="subtitle">Posts and Sharing:</h2>
          <p>
            Once you have a visualization completed and saved you are ready to make a post to the site.
          </p>
          <div className="image-container">
            <Image
              src="/toolpage7.png"
              alt="image description"
              width={500}
              height={314}
            />
          </div>
          <p>
            Clicking on "Create Post" will open the post editor window.
          </p>
          <Image
              src="/postwindow0.png"
              alt="image description"
              width={500}
              height={314}
            />
          <p>
            Here we can select any of our saved visualizations and then add a title and description to our post.
          </p>
          <Image
              src="/postwindow1.png"
              alt="image description"
              width={500}
              height={314}
            />
          <p>
          When you are ready to post go ahead and click "Create Post" to post it to your account.\n
          </p>
          <Image
              src="/account0.png"
              alt="image description"
              width={500}
              height={314}
            />
          <p>
            Posts you make are viewable to you under your "My Account" tab in the dashboard.
          </p>
        </section>
      </div>
    
    </Layout_Dashboard>

    
  );
};

export default Documentation;
