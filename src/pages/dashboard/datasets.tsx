import { type NextPage } from "next";
import Layout from "../../components/Layout";
import DashboardSidebar from "../../components/DashboardSidebar";
import PopUpForm from "src/components/PopUpWindow";
import { type SyntheticEvent, useState } from "react";

const Dashboard: NextPage = () => {
  const [displayAddDataset, setDisplayAddDataset] = useState<boolean>(false);
  const handleDisplayAddDataset = () =>
    setDisplayAddDataset(!displayAddDataset);
  const handleSubmit = (e: SyntheticEvent) => {
    console.log(e);
  };
  return (
    <Layout
      pageTitle="My Datasets"
      metaDescription="Collection of Datasets that the user has uploaded"
    >
      <DashboardSidebar />
      <div className="left-[50px] p-4">
        <p className="left-[50px] text-2xl font-bold">My Datasets</p>
      </div>
      {displayAddDataset && (
        <PopUpForm
          submitButtonText="Upload Dataset"
          closeWindowHandler={handleDisplayAddDataset}
          sumbitHandler={handleSubmit}
        >
          <h2 className="my-2 text-center text-2xl font-semibold text-black">
            Upload a new dataset
          </h2>
          <label htmlFor="datasetName">Dataset Name</label>
          <input
            type="text"
            id="datasetName"
            className="mt-2 rounded-lg border-2 bg-white p-3 text-sm text-black caret-black"
            placeholder="2023 Season Game Stats, Overall Player Stats, etc."
            required
          />
          <span className="mb-5 text-sm italic text-gray-600">
            What should we call your dataset?
          </span>
          <label htmlFor="datasetFileUpload">Dataset File</label>
          <input
            type="file"
            id="datasetFileUpload"
            className="rounded-lg border-2 bg-white p-3 text-sm text-black caret-black"
            placeholder="Search for datasets..."
            required
          />
          <span className="mb-1 text-sm italic text-gray-600">
            File must be either a .xlsx, .json, or .csv file.
          </span>
        </PopUpForm>
      )}

      <form>
        <div>
          <input
            type="search"
            id="search"
            className="w-[600px] rounded-lg border-2 bg-white p-4 text-sm text-black caret-black"
            placeholder="Search for datasets..."
          />
          <button
            type="button"
            onClick={handleDisplayAddDataset}
            className="mx-3 rounded-md bg-[#ff8200] p-4 font-semibold text-white duration-300 ease-in-out hover:brightness-75"
          >
            Add New Dataset
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Dashboard;
