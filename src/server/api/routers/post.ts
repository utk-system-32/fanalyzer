import { any, z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({

  createPost: publicProcedure
   .input(z.object({ visualization: z.string(), title: z.string(), content: z.string() }))
   .mutation(({ ctx, input }) => {
    return ctx.prisma.post.create({
      data: {
        authorId: ctx.session?.user?.id,
        visualization: input.visualization,
        title: input.title,
        content: input.content,
      }
    })
  }),

  deletePost: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.post.delete({
     where: {
       id: input
     }
   })
 }),

  
  updatePost: publicProcedure.input(z.object({
        postId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { postId, userId } = input;
      return ctx.prisma.post.update({
        where: { id: postId },
        data: {  likes: { push: userId } }
      });
  }),

  unlikePost: publicProcedure.input(z.object({
      postId: z.string(),
      userId: z.string(),
      likes: z.any(),
    })
  )
  .mutation(({ ctx, input }) => {
    const { postId, userId, likes } = input;
    return ctx.prisma.post.update({
      where: { id: postId },
      data: { likes: { set: likes.filter(entry => entry !== userId) } }
    });
  }),

  addComment: publicProcedure.input(z.object({
      postId: z.string(),
      userId: z.string(),
    })
  )
  .mutation(({ ctx, input }) => {
    const { postId, userId } = input;
    return ctx.prisma.post.update({
      where: { id: postId },
      data: {  likes: { push: userId } }
    });
  }),
  
  getAllPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      orderBy: { 
        createdAt: 'desc' 
      },
      include: { 
        author: true,
        comments: {
          include: {
            author: true,
          },
        },  
      }
    });
  }),

  getMyPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      },
      orderBy: { 
        createdAt: 'desc' 
      },
      include: { 
        author: true,
        comments: {
          include: {
            author: true,
          },
        }, 
      },
    });
  }),

  getUserPosts: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: input,
      },
      orderBy: { 
        createdAt: 'desc' 
      },
      include: { 
        author: true,
        comments: {
          include: {
            author: true,
          },
        }, 
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
      orderBy: { 
        createdAt: 'desc' 
      },
      include: { 
        author: true,
        comments: {
          include: {
            author: true,
          },
        }, 
      }
    });
  }),

  getIndividualPost: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
        where: {
          id: input
        },
        orderBy: { 
          createdAt: 'desc' 
        },
        include: { 
          author: true,
          comments: {
            include: {
              author: true,
            },
          },  
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
      orderBy: { 
        createdAt: 'desc' 
      },
      include: { 
        author: true,
        comments: {
          include: {
            author: true,
          },
        }, 
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
     orderBy: { 
      createdAt: 'desc' 
    },
     include: { 
      author: true,
      comments: {
        include: {
          author: true,
        },
      },  
    }
   })
 }),
});