import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function NavbarLink({
  isSidebarOpen,
  icon,
  label,
  isSelected,
  href,
}: {
  isSidebarOpen?: boolean;
  icon?: React.ReactNode;
  label: React.ReactNode;
  isSelected?: boolean;
  href: string;
}) {
  if (isSidebarOpen) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg dark:text-white p-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600",
          isSelected ? "bg-muted text-primary" : "text-muted-foreground"
        )}
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "flex h-9 w-9 items-center justify-center dark:text-white  rounded-lg transition-colors hover:text-rose-600  dark:hover:text-rose-600 ",
            isSelected ? "bg-muted text-primary" : "text-muted-foreground"
          )}
        >
          {icon}
          <div className="sr-only">{label}</div>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
