import React from "react";
import { Metadata } from "next";

import Header from "@/client/ui/atoms/Header";

export const metadata: Metadata = {
  title: "Account",
  description: "This is your account page",
};

export default function Layout(props: {
  children: React.ReactNode;
  stats: React.ReactNode;
  profile: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Header tag="h1">Account page</Header>

      {props.children}
      {props.stats}
      {props.profile}
    </div>
  );
}
