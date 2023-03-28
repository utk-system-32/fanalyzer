import { useEffect, type FunctionComponent } from "react";
import type CSVRow from "src/types/csv-row";
interface Props {
  data?: CSVRow[] | null;
}

const DatasetOutliner: FunctionComponent<Props> = ({ data }) => {
  //Ideas: Make an API call to read the file and then return the JSON...
  //Try to load it client side?
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <section className="bg-white-400 h-full min-w-[300px] border-r ">
      {data && (
        <h1 className="pt-1 text-center text-xl font-semibold">Headers</h1>
      )}
    </section>
  );
};

export default DatasetOutliner;
