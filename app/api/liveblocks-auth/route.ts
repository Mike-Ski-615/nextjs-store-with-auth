import { Liveblocks } from "@liveblocks/node";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { generateUserColor } from "@/lib/utils/user-color";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();

  if (!room) {
    return new Response("Missing room id", { status: 400 });
  }

  const user = session.user;

  const liveblocksSession = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.name ?? "匿名用户",
      color: generateUserColor(user.id),
    },
  });

  liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

  const { status, body } = await liveblocksSession.authorize();
  return new Response(body, { status });
}
