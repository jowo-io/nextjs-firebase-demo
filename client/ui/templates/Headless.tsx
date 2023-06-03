import React, { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {}

export default function Headless({ children }: Props) {
  return (
    <main className="p-sm min-h-screen bg-white dark:bg-black">
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
