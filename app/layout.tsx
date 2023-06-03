import React from "react";

import Favicon from "@/client/ui/snowflakes/Favicon";

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body>{children}</body>
    </html>
  );
}
