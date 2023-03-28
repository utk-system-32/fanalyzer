import { useEffect, type FunctionComponent } from "react";
import type CSVRow from "src/types/csv-row";
interface Props {
  data?: CSVRow[] | null;
}

const ColumnSelectOptions: FunctionComponent<Props> = ({ data }) => {
  return (
    <>
      {data &&
        data[0] &&
        Object.keys(data[0]).map((key, index) => (
          <option key={index} value={key}>
            {key}
          </option>
        ))}
    </>
  );
};

const DatasetOutliner: FunctionComponent<Props> = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <section className="bg-white-400 h-full min-w-[300px] border-r px-3">
      <h1 className="text-center text-2xl font-semibold">Visualizations</h1>
      <h1 className="text-lg font-semibold">Visualization Preset</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the visualization preset that you would like to use.
      </p>
      <select className="mb-5 w-full border bg-white p-2 text-sm">
        <option value="">Please select a visualization preset.</option>
      </select>
      <hr />
      <h1 className="mt-5 text-center text-2xl font-semibold">
        Column Configuration
      </h1>
      <h1 className="text-lg font-semibold">X Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the x coordinates of the X
        axis.
      </p>
      <select className="mb-5 w-full border bg-white p-2 text-sm">
        <option value="">Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <h1 className="text-lg font-semibold">X Column Labels</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the labels of each point on
        the x-axis.
      </p>
      <select className="mb-5 w-full border bg-white p-2 text-sm">
        <option>Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <h1 className="text-lg  font-semibold">Y Column</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the y coordinates on the
        x-axis.
      </p>
      <select className="mb-5 w-full border bg-white p-2 text-sm">
        <option>Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <h1 className="text-lg font-semibold">Y Column Labels</h1>
      <p className="mb-2 text-sm font-light text-gray-500">
        Please select the column that will represent the labels of each point on
        the Y axis.
      </p>
      <select className="mb-5 w-full border bg-white p-2 text-sm">
        <option>Please select a column.</option>
        <ColumnSelectOptions data={data} />
      </select>
      <hr />
    </section>
  );
};

export default DatasetOutliner;
