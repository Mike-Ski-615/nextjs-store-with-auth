import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      console.log("\n=================================");
      console.log("🔑 Password Reset Request");
      console.log("=================================");
      console.log(`👤 User ID: ${user.id}`);
      console.log(`📨 Email: ${user.email}`);
      console.log(`🔗 Reset URL: ${url}`);
      console.log("=================================\n");
    },
  },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
});
