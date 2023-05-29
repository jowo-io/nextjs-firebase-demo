"use client";

import Image from "next/image";

import { getLink } from "@/client/utils/links";
import getFirebase from "@/utils/firebase";
import { useDoc } from "@/hooks/useDoc";

import { Episode } from "../types";

const { db } = getFirebase();

type Props = Pick<Episode, "id" | "image" | "title" | "description" | "sats">;

export default function LiveCard({
  id,
  image,
  title,
  description,
  sats,
}: Props) {
  const data = useDoc(db, "episodes", id);
  return (
    <div key={id} className="text-center">
      <Image
        width={150}
        height={150}
        className="m-auto rounded-lg"
        src={image}
        alt=""
      />
      <div className="text-blue pt-4 dark:text-white">
        Sats: {data?.sats || sats}
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
