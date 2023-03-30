import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { IncomingForm, File } from "formidable";
import csv from "csv-parser";
import { createReadStream } from "fs";
import type CSVRow from "src/types/csv-row";

export const config = {
  api: {
    bodyParser: false,
  },
};

const datasetTestHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);

  try {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (files) {
        const file = files["file"];
        //Check the file extension and MIME Type
        //csv files can have text/csv and application/vnd.mx-excel as their MIME types.
        if (file instanceof File && !(file instanceof Array)) {
          //Load as CSV file.
          if (
            file.originalFilename?.split(".")[1] == "csv" &&
            (file.mimetype == "text/csv" ||
              file.mimetype == "application/vnd.ms-excel")
          ) {
            console.log("File is CSV.");
            //TODO: Make interface for this.
            const results: CSVRow[] = [];
            //Read the file
            createReadStream(file.filepath)
              .pipe(csv())
              .on("data", (data: CSVRow) => results.push(data))
              .on("end", () => {
                console.log("Successfully read file.");
                console.log(results);
                res.status(200).json({ data: JSON.stringify(results) });
              });
            return;
          }
        }
      }
      return;
    });
  } catch (cause) {
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default datasetTestHandler;
