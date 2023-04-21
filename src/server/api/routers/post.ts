import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({

  createPost: publicProcedure
   .input(z.object({ username: z.string(), title: z.string(), content: z.string() }))
   .mutation(({ ctx, input }) => {
    return ctx.prisma.post.create({
      data: {
        authorId: ctx.session?.user?.id,
        title: input.title,
        content: input.content,
        likes: 0
      }
    })
  }),

  getAllPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      include: { 
        author: true 
      }
    });
  }),

  getMyPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      },
      include: { 
        author: true 
      }
    });
  }),

  getUserPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: input,
      },
      include: { 
        author: true 
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
      },
      include: { 
        author: true 
      }
    });
  }),

  getSearchPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: input
            }
          },
          {
            content: {
              contains: input
            }
          }
        ]
      },
      include: { 
        author: true 
      }
    });
  }),

  postSearch: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.post.findMany({
     where: {
       OR: [
         {
           title: {
             contains: input
           }
         },
         {
           content: {
             contains: input
           }
         }
       ]
     },
     include: { 
      author: true 
    }
   })
 }),
});