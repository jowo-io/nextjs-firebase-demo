import React, { PropsWithChildren } from "react";

import BasicTemplate from "@/client/ui/templates/Basic";

export default function Layout({ children }: PropsWithChildren) {
  return <BasicTemplate>{children}</BasicTemplate>;
}
