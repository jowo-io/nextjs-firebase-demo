import React from "react";

import MenuNav from "@/client/ui/organisms/MenuNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-sm min-h-screen bg-black">
      <MenuNav />
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
