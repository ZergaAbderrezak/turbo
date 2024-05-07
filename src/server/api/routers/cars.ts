import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const CarPropsSchema = z.object({
  make: z.string().nonempty(),
  model: z.string().nonempty(),
  color: z.string().nonempty(),
  fuel: z.enum(["diesel", "gasoline"]),
  type: z.enum(["manual", "automatic"]),
  year: z.number().max(2024, "There is no car that exists in the future :)"),
  imageUrl: z.string().optional(),
  location: z.string().nonempty(),
  pricePerDay: z.number(),
});

export type CarProps = z.infer<typeof CarPropsSchema>;

export const carsRouter = createTRPCRouter({
  getAllCars: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany({
      take: 100,
    });
  }),
  getCarById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.car.findUnique({
        where: { id: input.id },
      });

      if (!post) throw new TRPCError({ code: "NOT_FOUND" });

      return post;
    }),
  // TRPC procedure to create a new car
  addCar: protectedProcedure
    .input(CarPropsSchema)
    .mutation(async ({ ctx, input }) => {
      // database query
      const data = await ctx.prisma.car.create({
        data: {
          make: input.make,
          model: input.model,
          color: input.color,
          fuel: input.fuel,
          type: input.type,
          year: input.year,
          location: input.location,
          pricePerDay: input.pricePerDay,
          ownerId: ctx.session.user.id,
        },
      });
      return data;
    }),
  // TRPC procedure to delete a car
  deleteCar: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // database query
      const data = await ctx.prisma.car.delete({ where: { id: input.id } });
      return data;
    }),
});
