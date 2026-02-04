import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">   
        <main className="flex-grow container mx-auto p-4">{children}</main>
    </div>
  );
}   