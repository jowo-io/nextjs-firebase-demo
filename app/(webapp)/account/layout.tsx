import React from "react";
import { Metadata } from "next";

import Header from "@/client/ui/atoms/Header";
import { getServerAuth } from "@/utils/firebase/admin";
import { User } from "@/hooks/useAuth";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Account",
  description: "This is your account page",
};

async function getData() {
  const { user } = await getServerAuth();

  return {
    user,
  };
}

export default async function Layout(props: {
  children: React.ReactNode;
  stats: React.ReactNode;
  profile: React.ReactNode;
}) {
  const { user } = await getData();

  if (!user) {
    return (
      <div className="w-full text-white">Please login to see this page</div>
    );
  }

  return (
    <div className="w-full">
      <Header tag="h1">Account page</Header>

      {props.children}
      {props.stats}
      {props.profile}
    </div>
  );
}
