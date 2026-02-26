import { cache } from 'react';
import { ZodError } from 'zod';
import superjson from 'superjson';
import { headers } from 'next/headers';
import { initTRPC } from '@trpc/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Creates the tRPC context with Prisma client and authentication session
 * @see: https://trpc.io/docs/server/context
 */
export const createTRPCContext = cache(async (opts?: { headers?: Headers }) => {
  const requestHeaders = opts?.headers ?? (await headers());
  const session = await auth.api.getSession({ headers: requestHeaders });

  return {
    session,
    prisma,
    userId: session?.user?.id,
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialize tRPC with superjson transformer and Zod error formatting
 * @see https://trpc.io/docs/server/data-transformers
 * @see https://trpc.io/docs/server/error-formatting
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const middleware = t.middleware;