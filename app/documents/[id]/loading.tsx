import { Skeleton } from "@/components/ui/skeleton"

/**
 * loading.tsx — Next.js 路由级即时加载状态（Instant Loading State）
 *
 * Next.js 会自动将此文件嵌套在 layout.tsx 内部，
 * 用 <Suspense fallback={<Loading />}> 包裹 page.tsx。
 *
 * 优势：
 * - 导航时立即显示（prefetched），零延迟
 * - 服务端流式渲染，静态 shell 的一部分
 * - 与 layout 共享，布局保持交互
 *
 * 这里只画区域轮廓作为服务端数据加载期间的即时反馈。
 */
export default function Loading() {
  return (
    <>
      {/* ── MenuBar 区域 ── */}
      {/* 桌面端：5 个菜单触发器 + 居中文件名 */}
      <div className="border-b hidden md:flex items-center gap-1 px-2 h-9">
        <Skeleton className="h-5 w-10 rounded-sm" />
        <Skeleton className="h-5 w-10 rounded-sm" />
        <Skeleton className="h-5 w-10 rounded-sm" />
        <Skeleton className="h-5 w-7 rounded-sm" />
        <Skeleton className="h-5 w-10 rounded-sm" />
        {/* 居中文件名占位 */}
        <div className="flex-1" />
        <Skeleton className="h-4 w-24 rounded-sm" />
        <div className="flex-1" />
      </div>
      {/* 移动端：汉堡菜单 + 标签 */}
      <div className="border-b flex md:hidden items-center px-2 py-1.5">
        <Skeleton className="h-7 w-7 rounded-md" />
        <Skeleton className="ml-2 h-4 w-8 rounded-sm" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ── Toolbar 区域 ── */}
        <div className="flex items-center gap-1 p-1 border-b flex-wrap">
          {/* 撤销/重做 */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 段落样式 */}
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 基础文本格式 B/I/U/S */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 上下标 */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 颜色/高亮 */}
          <Skeleton className="h-7 w-[86px] rounded-[12px]" />
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 行高 */}
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 对齐 */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 列表 */}
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 引用/代码块/代码 */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 分隔线/换行 */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 链接/图片/公式 */}
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <Skeleton className="h-7 w-7 rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 表格 */}
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
          <div className="h-8 w-px mx-1 bg-border" />
          {/* 任务列表 */}
          <Skeleton className="h-7 w-[58px] rounded-[12px]" />
        </div>

        {/* ── 编辑区域 ── */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none mx-auto space-y-4">
            {/* 模拟标题 */}
            <Skeleton className="h-6 w-2/5 rounded" />
            {/* 模拟段落 */}
            <div className="space-y-2.5 pt-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            <div className="space-y-2.5 pt-1">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          </div>
        </div>

        {/* ── Sidebar 底栏 ── */}
        <div className="h-5 w-full border-t flex items-center justify-between px-4">
          <Skeleton className="h-3 w-[140px] rounded-sm" />
          <Skeleton className="h-[10px] w-[10px] rounded-full" />
        </div>
      </div>
    </>
  )
}
