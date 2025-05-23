"use client";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  FolderClosed,
  LayoutGrid,
  Package2,
  PieChart,
  Settings,
  SquareCheck,
  Users,
} from "lucide-react";
import { useAtom } from "jotai";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { sidebarOpen } from "@/hooks/atoms";
import { cn } from "@/lib/utils";
import { NavbarLink } from "./NavbarLink";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setOpen] = useAtom(sidebarOpen);
  const path = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 border-r z-20 bg-white transition-[width] ease-in-out overflow-hidden dark:bg-gray-700 dark:text-gray-200",
        "flex flex-col max-h-screen h-full",
        isOpen ? "w-[18rem]" : "w-[3.5rem]"
      )}
    >
      {/* Sidebar header */}
      <div
        className={cn(
          "flex items-center h-[60px] border-b",
          isOpen ? "px-6" : "flex-col justify-center animate-sidebar-closed"
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {
            isOpen ? (
              <Image alt="Logo" src={"/logo.png"} width={200} height={100} />
            ) : (
              <Image alt="Logo" src={"/hideSide.png"} width={100} height={100} />
            )
          }
        </Link>
        {isOpen ? (
          <Button
            variant="secondary"
            size="icon"
            className="ml-auto h-6 w-6"
            onClick={() => setOpen((prev) => !prev)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Navbar</span>
          </Button>
        ) : null}
      </div>
      <nav className="flex flex-col flex-1 text-sm font-medium">
        {/* Main menu links */}
        <div
          className={cn(
            "flex flex-col",
            isOpen ? "p-4" : "items-center gap-y-4 py-4 animate-sidebar-closed"
          )}
        >
          <NavbarLink
            href="/dashboard"
            isSidebarOpen={isOpen}
            icon={<LayoutGrid className="h-4 w-4 shrink-0" />}
            label="Dashboard"
            isSelected={path === "/"}
          />
          <NavbarLink
            href="/dashboard/vaga"
            isSidebarOpen={isOpen}
            icon={<BriefcaseBusiness className="h-4 w-4 shrink-0" />}
            label="Vagas"
            isSelected={path === "/vaga"}
          />
          <NavbarLink
            href="/dashboard/candidate"
            isSelected={path === "/candidate"}
            isSidebarOpen={isOpen}
            icon={<Users className="h-4 w-4 shrink-0" />}
            label="Candidatos"
          />
          <NavbarLink
            href="/dashboard/tasks"
            isSelected={path === "/tasks"}
            isSidebarOpen={isOpen}
            icon={<SquareCheck className="h-4 w-4 shrink-0" />}
            label={
              <div className="flex w-full justify-between gap-x-2">
                Tasks
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </div>
            }
          />
          <NavbarLink
            href="/dashboard/projects"
            isSelected={path === "/projects"}
            isSidebarOpen={isOpen}
            icon={<FolderClosed className="h-4 w-4 shrink-0" />}
            label="Processos"
          />

          <NavbarLink
            href="/dashboard/reports"
            isSelected={path === "/reports"}
            isSidebarOpen={isOpen}
            icon={<PieChart className="h-4 w-4 shrink-0" />}
            label="Reports"
          />
        </div>
        {/* Bottom section of the sidebar */}
        <div
          className={cn(
            "mt-auto flex flex-col border-b border-t",
            isOpen ? "p-4" : "items-center gap-y-4 py-4 animate-sidebar-closed"
          )}
        >
          <NavbarLink
            href="/dashboard/settings"
            isSelected={path === "/settings"}
            isSidebarOpen={isOpen}
            icon={<Settings className="h-4 w-4 shrink-0" />}
            label="Definições"
          />
          <NavbarLink
            isSelected={path === "/notifications"}
            href="/dashboard/notifications"
            isSidebarOpen={isOpen}
            icon={<Bell className="h-4 w-4 shrink-0" />}
            label="Notificações"
          />
        </div>
        {/* User menu */}
        <UserMenu isSidebarOpen={isOpen} />
      </nav>
    </aside>
  );
}
