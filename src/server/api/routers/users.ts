import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// TRPC router for back end
export const usersRouter = createTRPCRouter({
  // a TRPC procedure to return users by id
  getUserById: publicProcedure
    // input of the procedure (api)
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // database query to find a user by id
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });

      // check if user is not found return NOT FOUND error
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      // finally return the user
      return user;
    }),
});
