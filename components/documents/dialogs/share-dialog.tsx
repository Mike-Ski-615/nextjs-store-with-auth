"use client";

import { env } from "process";
import { useRef } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

export function ShareDialog({
  open,
  onOpenChange,
  documentId,
  documentName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
  documentName: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const shareUrl = `${env.BETTER_AUTH_URL}/documents/${documentId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("链接已复制到剪贴板");
    } catch {
      inputRef.current?.select();
      toast.error("复制失败，请手动复制");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>分享文档</DialogTitle>
          <DialogDescription>分享「{documentName}」给其他人</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <QRCodeSVG value={shareUrl} size={360} level="M" />
          <div className="flex w-full items-center gap-2">
            <Input ref={inputRef} value={shareUrl} readOnly />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
