"use client";
import { doc, updateDoc, increment, deleteDoc } from "firebase/firestore";

import getFirebase from "@/utils/firebase/client";
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
      className="m-auto max-w-lg rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <h6 className="mb-2 flex items-center justify-between text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        <b>@{user}</b>
        <i className="text-sm">{createdAt?.toString()}</i>
        {/* <button
          onClick={async () => {
            await deleteDoc(doc(db, "boosts", id));
          }}
        >
          x
        </button> */}
      </h6>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {message}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-blue dark:text-white">
          Sats: {data?.sats || sats}
        </div>

        <button
          onClick={async () => {
            const ref = doc(db, "boosts", id);
            await updateDoc(ref, {
              sats: increment(50),
            });
          }}
          className="rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
        >
          Boost
        </button>
      </div>
    </div>
  );
}
