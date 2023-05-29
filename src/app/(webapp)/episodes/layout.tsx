import React from "react";
import { Metadata } from "next";

import Header from "@/client/ui/atoms/Header";

export const metadata: Metadata = {
  title: "Episodes",
  description: "View all the episodes here",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}
