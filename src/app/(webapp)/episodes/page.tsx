import getFirebase from "@/utils/firebase";

import LiveCard from "./LiveCard";
import { Episode } from "./types";
import { env } from "@/env.mjs";

async function getData(): Promise<Episode[]> {
  await new Promise((r) => setTimeout(r, 1000));

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/episodes/api/list", {
    method: "POST",
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
      {data.map(({ id, image, title, summary, sats }) => (
        <LiveCard
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
