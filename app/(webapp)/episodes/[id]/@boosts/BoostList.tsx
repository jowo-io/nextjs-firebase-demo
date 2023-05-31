"use client";

import { useEffect, useState } from "react";
import {
  collection,
  setDoc,
  query,
  where,
  orderBy,
  doc,
  onSnapshot,
  Timestamp,
  startAfter,
} from "firebase/firestore";

import getFirebase from "@/utils/firebase";

import BoostCard from "./BoostCard";
import { Boost } from "../../../boosts/types";

const { db } = getFirebase();

type Props = {
  boosts: Boost[];
  episodeId: string;
};

export function useDocs(episodeId: string, date: Date | undefined) {
  const [data, setData] = useState<Boost[]>([]);

  useEffect(() => {
    if (!date) return;
    console.log(date);
    const boostsRef = collection(db, "boosts");
    const q = query(
      boostsRef,
      where("episodeId", "==", episodeId),
      where("createdAt", ">", new Date(date)),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      snap.docChanges().forEach((change) => {
        const boost = change.doc.data();
        console.log(change.type);
        console.log(boost);

        if (change.type === "added") {
          setData((prevData) => [
            {
              ...boost,
              createdAt: boost.createdAt.toDate().toISOString(),
            } as Boost,
            ...prevData,
          ]);
        }
      });
    });

    return () => unsub();
  }, []);

  return data;
}

export default function BoostList({ boosts, episodeId }: Props) {
  const data = useDocs(episodeId, boosts?.[0]?.createdAt);
  console.log(data);

  return (
    <>
      <button
        onClick={async () => {
          const id = Date.now().toString();
          const ref = doc(db, "boosts", id);
          await setDoc(ref, {
            id,
            episodeId,
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo pharetra quam, at cursus tellus dictum sed. Nunc venenatis fringilla commodo. ",
            user: "anon",
            sats: 0,
            createdAt: Timestamp.now(),
          });
        }}
        className="rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
      >
        Add Boost
      </button>
      {[...data, ...boosts].map(({ id, message, user, sats, createdAt }) => (
        <BoostCard
          key={id}
          id={id}
          user={user}
          message={message}
          sats={sats}
          createdAt={createdAt}
        />
      ))}
    </>
  );
}
