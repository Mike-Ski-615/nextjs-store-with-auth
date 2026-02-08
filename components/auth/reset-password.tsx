"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(8, "密码长度不能小于8位"),
    confirmPassword: z.string().min(8, "密码长度不能小于8位"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success("密码重置成功，请使用新密码登录");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "密码重置失败");
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>重置密码</CardTitle>
        <CardDescription>请输入您的新密码</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">新密码</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    disabled={form.formState.isSubmitting}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirm-password">确认新密码</FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    disabled={form.formState.isSubmitting}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? "重置中..." : "重置密码"}
              </Button>
              <FieldDescription className="text-center">
                记起密码了？ <Link href="/login">返回登录</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
