import React from "react";
import Head from "next/head";
import { initializeApp } from "firebase/app";

import Favicon from "@/client/ui/snowflakes/Favicon";

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <Favicon />
      </Head>
      <body>{children}</body>
    </html>
  );
}
