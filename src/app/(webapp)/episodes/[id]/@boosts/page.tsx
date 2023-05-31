"use server";

import Header from "@/client/ui/atoms/Header";
import { env } from "@/env.mjs";

import BoostList from "./BoostList";
import { Boost } from "../../../boosts/types";

async function getData(id: string): Promise<Boost[]> {
  await new Promise((r) => setTimeout(r, 3000));

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/boosts/api/list?v=1", {
    method: "POST",
    body: JSON.stringify({ id }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // if (Math.random() < 0.333) {
  //   throw new Error("Something broke");
  // }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getData(id);

  return (
    <div>
      <Header tag="h3">Boosts</Header>
      <BoostList boosts={data} />
    </div>
  );
}
