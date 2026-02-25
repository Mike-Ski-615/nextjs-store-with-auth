"use client"
import { useQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export default function Page() {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions())

  return (
    <div className="flex items-center justify-center min-h-screen">
      {JSON.stringify(users)}
    </div>
  );
}