import { z } from 'zod'

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'

export const countryRouter = createTRPCRouter({
  getAllNames: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.country.findMany({ select: { name: true } })
  }),
  getTenMatchingNames: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.country.findMany({
        take: 10,
        select: { name: true },
        where: {
          name: {
            contains: input.name,
          },
        },
      })
    }),
  getFirstMatchingCountry: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.country.findFirst({
        where: {
          name: {
            equals: input.name,
          },
        },
      })
    }),
})
