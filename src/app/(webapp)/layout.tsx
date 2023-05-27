import React from "react";

import BasicNav from "@/client/ui/organisms/BasicNav";
import SideBar from "@/client/ui/organisms/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-sm min-h-screen bg-black">
      <BasicNav />
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          {children}
        </div>
      </div>
      {/* <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div> */}
    </main>
  );
}
