import React from "react";

import BasicTemplate from "@/client/ui/templates/Basic";

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BasicTemplate>{children}</BasicTemplate>;
}
