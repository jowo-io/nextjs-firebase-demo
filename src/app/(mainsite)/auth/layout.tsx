import React from "react";
import { Metadata } from "next";

import MenuNav from "@/client/ui/organisms/MenuNav";

export const metadata: Metadata = {
  title: "Login / Signup",
  description: "Login / Signup to access cool stuff!",
};

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
