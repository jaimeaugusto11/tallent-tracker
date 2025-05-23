"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { sidebarOpen } from "@/hooks/atoms";
import { cn } from "@/lib/utils";

export default function ToggleSidebarButton() {
  const [isOpen, setOpen] = useAtom(sidebarOpen);
  return (
    <div
      className={cn(
        " w-[60px] h-[60px] absolute top-0 flex items-center justify-center",
        isOpen && "hidden"
      )}
    >
      <Button
        variant="secondary"
        size="icon"
        className="h-6 w-6 text-foreground/50 hover:text-foreground transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Toggle Navbar</span>
      </Button>
    </div>
  );
}
