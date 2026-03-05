import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-black text-white">
      <h1 >
        <main>
          {children}
        </main>
      </h1>
    </div>
  );
}