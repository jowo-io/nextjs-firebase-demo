"use server";

import React from "react";
import { Metadata } from "next";

import { env } from "@/env.mjs";

import { Episode } from "../types";

type MetadataProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id } = params;

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/episodes/api/get?v=1", {
    method: "POST",
    body: JSON.stringify({ id }),
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const episode: Episode = await res.json();

  return {
    title: episode.title,
    description: episode.summary,
    openGraph: {
      title: episode.title,
      description: episode.summary,
      images: [env.NEXT_PUBLIC_SITE_URL + episode.image],
    },
    twitter: {
      title: episode.title,
      description: episode.summary,
      images: [env.NEXT_PUBLIC_SITE_URL + episode.image],
    },
  };
}

export default async function Layout({
  children,
  boosts,
}: {
  children: React.ReactNode;
  boosts: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {children}
      {boosts}
    </div>
  );
}
