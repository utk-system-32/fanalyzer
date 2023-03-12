import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const datasetTestHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);

  try {
    console.log("In the API ROUTE!");
    console.log("request body: ", req.body);
    res.status(200).json({ message: "got the data." });
  } catch (cause) {
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default datasetTestHandler;
