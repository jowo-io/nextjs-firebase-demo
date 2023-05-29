import Header from "@/client/ui/atoms/Header";
import { env } from "@/env.mjs";

import BoostList from "./BoostList";
import { Boost } from "../../../boosts/types";

async function getData(id: string): Promise<Boost[]> {
  await new Promise((r) => setTimeout(r, 1000));

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/boosts/api/list?abc", {
    method: "POST",
    body: JSON.stringify({ id }),
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
  const data = await getData(id);

  return (
    <div>
      <Header tag="h3">Boosts</Header>
      <BoostList boosts={data} />
    </div>
  );
}
