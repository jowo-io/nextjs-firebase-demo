import React, { PropsWithChildren } from "react";
import MenuNav from "@/client/ui/organisms/MenuNav";

export interface Props extends PropsWithChildren {}

export default function Basic({ children }: Props) {
  return (
    <main className="p-sm min-h-screen bg-white dark:bg-black">
      <MenuNav />
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
