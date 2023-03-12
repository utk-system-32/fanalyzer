import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const datasetRouter = createTRPCRouter({
  test: publicProcedure
    .input(
      z.object({
        datasetName: z.string(),
        datasetFileUpload: z.instanceof(File),
      })
    )
    .query(({ input }) => {
      return input;
    }),
});
