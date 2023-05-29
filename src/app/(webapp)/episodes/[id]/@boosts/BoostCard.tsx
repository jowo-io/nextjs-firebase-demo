"use client";

import getFirebase from "@/utils/firebase";
import { useDoc } from "@/hooks/useDoc";

import { Boost } from "../../../boosts/types";

const { db } = getFirebase();

type Props = Pick<Boost, "id" | "message" | "user" | "sats" | "createdAt">;

export default function BoostCard({
  id,
  message,
  user,
  sats,
  createdAt,
}: Props) {
  const data = useDoc(db, "boosts", id);
  return (
    <div
      key={id}
      className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <h6 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        <b>@{user}</b> at <i>{createdAt?.toString()}</i>
      </h6>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {message}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-blue dark:text-white">
          Sats: {data?.sats || sats}
        </div>
      </div>
    </div>
  );
}
