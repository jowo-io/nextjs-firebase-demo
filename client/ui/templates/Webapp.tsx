import React, { PropsWithChildren } from "react";

import BasicNav from "@/client/ui/organisms/BasicNav";
import SideBar from "@/client/ui/organisms/SideBar";

export interface Props extends PropsWithChildren {}

export default function Webapp({ children }: Props) {
  return (
    <main className="p-sm min-h-screen bg-white dark:bg-black">
      <BasicNav />
      <SideBar />

      <div className="ml-10 p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          {children}
        </div>
      </div>
    </main>
  );
}
