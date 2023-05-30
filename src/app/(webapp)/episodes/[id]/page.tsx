"use server";

import { env } from "@/env.mjs";

import EpisodeCard from "./EpisodeCard";
import { Episode } from "../types";

async function getData(id: string): Promise<Episode> {
  await new Promise((r) => setTimeout(r, 1000));

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/episodes/api/get?v=1", {
    method: "POST",
    body: JSON.stringify({ id }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const { image, title, description, sats } = await getData(id);

  return (
    <EpisodeCard
      key={id}
      id={id}
      image={image}
      title={title}
      description={description}
      sats={sats}
    />
  );
}
