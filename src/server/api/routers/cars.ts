import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const carsRouter = createTRPCRouter({
  getAllCars: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
