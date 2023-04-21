import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({

  getUsers: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findMany();
  }),

  getUserByUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        username: input,
      }
    });
  }),

  getUserByID: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: input,
      }
    });
  }),

  getUserByIDMut: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.user.findMany({
     where: {
      id: input
     } 
   })
 }),

  getUserByUsernameMut: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.user.findMany({
     where: {
      username: input
     } 
   })
 }),

 getSearchUsers: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.user.findMany({
    where: {
      username: {
        contains: input
       }
    }
  });
}),

 userSearch: publicProcedure
 .input(z.string())
 .mutation(({ ctx, input }) => {
  return ctx.prisma.user.findMany({
    where: {
     username: {
      contains: input
     }
    } 
  })
}),

 updateUsername: publicProcedure
 .input(z.string())
 .mutation(({ ctx, input }) => {
  return ctx.prisma.user.update({
    where: {
     id: ctx.session?.user?.id
    },
    data: {
      username: input,
    }
  })
}),

updateUser: publicProcedure
.input(z.object({ username: z.string(), image: z.any()}))
.mutation(({ ctx, input }) => {
//const imageBuffer = Buffer.from(input.image.data);
 return ctx.prisma.user.update({
   where: {
    id: ctx.session?.user?.id
   },
   data: {
     username: input.username,
     image: input.image
   }
 })
}),

 getUserFollowers: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.user.count({
    where: {
      following: {
        some: {
          followingId: input
        }
      }
    }
  });
}),

 getUserFollowing: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.user.count({
    where: {
      followers: {
        some: {
          followerId: input
        }
      }
    }
  });
}),
 
});