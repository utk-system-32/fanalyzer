import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const visualizationRouter = createTRPCRouter({
  createVisualization: publicProcedure
    .input(z.object({ title: z.string(), data: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.visualization.create({
        data: {
          authorId: ctx.session?.user?.id,
          title: input.title,
          data: input.data,
        },
      });
    }),
});
