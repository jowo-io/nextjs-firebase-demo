"use server";

import Header from "@/client/ui/atoms/Header";
import { env } from "@/env.mjs";

import EpisodeCard from "./EpisodeCard";
import { Episode } from "./types";

async function getData(): Promise<Episode[]> {
  await new Promise((r) => setTimeout(r, 1000));

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/episodes/api/list?v=1", {
    method: "POST",
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <Header tag="h1">Episodes</Header>
      {data.map(({ id, image, title, summary, sats }) => (
        <EpisodeCard
          key={id}
          id={id}
          image={image}
          title={title}
          summary={summary}
          sats={sats}
        />
      ))}
    </div>
  );
}
