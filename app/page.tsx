"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  if (isPending) return <Spinner />;
  if (error) return <p>错误请重试</p>;
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <Button onClick={() => refetch()}>刷新</Button>
      <Button
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
              },
            },
          })
        }
      >
        登出
      </Button>
    </div>
  );
}
