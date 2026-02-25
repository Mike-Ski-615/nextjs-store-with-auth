import 'server-only'; // <-- ensure this file cannot be imported from the client
import { cache } from 'react';
import { headers } from 'next/headers';

import { createTRPCContext } from './init';
import { appRouter } from './routers/_app';

/**
 * Create a server-side tRPC caller for use in server components
 * This provides direct access to tRPC procedures without HTTP overhead
 */
export const trpc = cache(async () => {
  const headersList = await headers();
  const ctx = await createTRPCContext({ headers: headersList });
  return appRouter.createCaller(ctx);
});
