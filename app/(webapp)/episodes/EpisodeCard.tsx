"use client";

import Image from "next/image";
import Link from "next/link";

import { getLink } from "@/client/utils/links";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";
import getFirebase from "@/utils/firebase";
import { useDoc } from "@/hooks/useDoc";

import { Episode } from "./types";

const { db } = getFirebase();

type Props = Pick<Episode, "id" | "image" | "title" | "summary" | "sats">;

export default function EpisodeCard({
  id,
  image,
  title,
  summary,
  sats,
}: Props) {
  const data = useDoc(db, "episodes", id);
  const url = getLink("viewEpisode", { id });
  return (
    <div
      key={id}
      className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <Link href={url}>
        <Image
          width={200}
          height={200}
          className="w-full rounded-t-lg"
          src={image}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link href={url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {summary}
        </p>
        <div className="flex items-center justify-between">
          <Link
            href={url}
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 "
          >
            <span>Listen</span> <MusicalNoteIcon className="inline h-4 w-4" />
          </Link>
          <div className="text-blue dark:text-white">
            Sats: {data?.sats || sats}
          </div>
        </div>
      </div>
    </div>
  );
}
