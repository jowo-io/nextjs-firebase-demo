import React, { PropsWithChildren } from "react";
import Nav from "@/client/ui/organisms/MenuNav";

export interface Props extends PropsWithChildren {}

export default function BasicTemplate({ children }: Props) {
  return (
    <main className="p-sm min-h-screen bg-white dark:bg-black">
      <Nav />
      <div className="text-white">side bar here</div>
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
