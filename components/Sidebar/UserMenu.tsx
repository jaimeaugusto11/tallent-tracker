import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
//import { Button } from "../ui/button";
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function UserMenu({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  if (!isSidebarOpen) {
    return (
      <div className={"bg-muted/60 flex flex-col items-center py-4 justify-center animate-sidebar-closed"}>
        <UserSettingsMenu>
          <Button variant="ghost" size="icon">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="https://avatar.vercel.sh/aprendo.png"
                alt="@yovanylg"
              />
              <AvatarFallback>YL</AvatarFallback>
            </Avatar>
          </Button>
        </UserSettingsMenu>
      </div>
    );
  }

  return (
    <div className="bg-muted/60 flex items-center py-4 px-6 gap-2">
      <Avatar>
        <AvatarImage
          src="https://9o3ej1jn12.ufs.sh/f/xrw3IzaXqwJcBGvsDWLXMQLY6PoWtyau1ZdbsUcFwN4nvTRK"
          alt="@yovanylg"
        />
        <AvatarFallback>JA</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold">Jaime André</span>
        <span className="text-sm">jaime.andré@zap.co.ao</span>
      </div>
      <UserSettingsMenu>
        <Button variant="secondary" size="icon" className="h-6 w-6 ml-auto">
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </UserSettingsMenu>
    </div>
  );
}

function UserSettingsMenu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Perfil</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
