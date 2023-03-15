import { useEffect, type FunctionComponent } from "react";
interface Props {
  file?: File | null;
}

const DatasetOutliner: FunctionComponent<Props> = ({ file }) => {
  //Ideas: Make an API call to read the file and then return the JSON...
  //Try to load it client side?
  useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <section>
      <h1>Testing!</h1>
    </section>
  );
};

export default DatasetOutliner;
