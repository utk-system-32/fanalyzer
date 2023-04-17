import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({

  createPost: publicProcedure
   .input(z.object({ username: z.string(), title: z.string(), content: z.string() }))
   .mutation(({ ctx, input }) => {
    return ctx.prisma.post.create({
      data: {
        authorId: ctx.session?.user?.id,
        authorUsername: input.username,
        title: input.title,
        content: input.content,
        likes: 0
      }
    })
  }),

  getAllPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany();
  }),

  getMyPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      }
    });
  }),

  getUserPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: input,
      }
    });
  }),

  getFollowingPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: {
              follower: {
                id: ctx.session?.user?.id
              }
            }
          }
        }
      }
    });
  }),
});