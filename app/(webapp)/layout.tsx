import React, { PropsWithChildren } from "react";

import WebappTemplate from "@/client/ui/templates/Webapp";

export default function Layout({ children }: PropsWithChildren) {
  return <WebappTemplate>{children}</WebappTemplate>;
}
