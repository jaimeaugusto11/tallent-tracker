"use client";
import { sidebarOpen } from "@/hooks/atoms";
import { useAtom } from "jotai";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/ModeToggle";

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen] = useAtom(sidebarOpen);

  return (
    <div className=" flex  items-center justify-between h-[60px] pr-6 border-b">
      <div>
      <ToggleSidebarButton />
      <div
        className={cn(
          "flex gap-x-2 items-center transition-[padding-left]",
          isOpen ? "pl-5" : "pl-[60px]"
        )}
      >
        {children}
      </div>
      </div>
      <ModeToggle/>
    </div>
  );
}
