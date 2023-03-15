import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { IncomingForm, File } from "formidable";
import { Workbook } from "exceljs";

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
        const workbook = new Workbook();
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
            let data = { columns: [], rows: [] };
            workbook.csv
              .readFile(file.filepath)
              .then((worksheet) => {
                worksheet.eachRow((row, rowNumber) => {
                  console.log(row.values);
                  if (rowNumber == 1) {
                    data["columns"] = row.values.slice(1);
                  } else {
                    data["rows"].push(row.values.slice(1));
                  }
                });
                //Send CSV data back to the frontend.
                res.status(200).json(data);
              })
              .catch((error) => console.error(error));
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
