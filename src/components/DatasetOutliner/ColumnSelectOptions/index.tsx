import { type FunctionComponent } from "react";
import type CSVRow from "src/types/csv-row";

interface CSOProps {
  data?: CSVRow[] | null;
}
const ColumnSelectOptions: FunctionComponent<CSOProps> = ({ data }) => {
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

export default ColumnSelectOptions;
