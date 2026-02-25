import { Crown, UserCheck } from "lucide-react";

export const DEFAULT_AVATAR = "https://github.com/evilrabbit.png";
export const MAX_VISIBLE_AVATARS = 3;

export const ROLE_CONFIG = {
  OWNER: { label: "所有者", icon: Crown, variant: "default" as const },
  ADMIN: { label: "管理员", icon: UserCheck, variant: "default" as const },
  WRITE: { label: "编辑者", icon: UserCheck, variant: "secondary" as const },
  READ: { label: "查看者", icon: UserCheck, variant: "outline" as const },
};

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
