import type { Metadata } from "next";
import "../(back-office)/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tallent tracker",
  description: "Generated by create next app",
  icons:{
    icon:"/icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex bg-[#E9EBF8]",
          fontSans.variable
        )}
      >
        <TooltipProvider delayDuration={200}>
        
         {children}
        </TooltipProvider>
      </body>
    </html>
  );
}