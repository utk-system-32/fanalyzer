import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import IncomingForm from "formidable/Formidable";

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
    console.log("in the api route.");
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (files) {
        const file = files[0];
        console.log(file);
      }
    });
    res.status(200).json({ message: "got the data." });
  } catch (cause) {
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default datasetTestHandler;
