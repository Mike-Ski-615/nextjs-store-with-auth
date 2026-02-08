import { ResetPasswordForm } from "@/components/auth/reset-password";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  return <ResetPasswordForm token={token} />;
}
