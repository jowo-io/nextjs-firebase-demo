"use server";

import Header from "@/client/ui/atoms/Header";
import { env } from "@/env.mjs";

import EpisodeCard from "./EpisodeCard";
import { Episode } from "./types";

export default async function Page() {
  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/episodes/api/list?v=1", {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await res.json()) as Episode[];

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
