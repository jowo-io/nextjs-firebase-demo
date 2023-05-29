import Image from "next/image";

import { env } from "@/env.mjs";

import { Episode } from "../types";

async function getData(id: string): Promise<Episode> {
  await new Promise((r) => setTimeout(r, 1000));

  const res = await fetch(env.NEXT_PUBLIC_SITE_URL + "/episodes/api/get", {
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
  console.log({ id });
  const { image, title, description, sats } = await getData(id);

  return (
    <div
      key={id}
      className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <Image
        width={200}
        height={200}
        className="w-full rounded-t-lg"
        src={image}
        alt=""
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-blue dark:text-white">Sats: {sats}</div>
        </div>
      </div>
    </div>
  );
}
