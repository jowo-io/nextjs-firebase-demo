"use client";

import getFirebase from "@/utils/firebase";
import { useDoc } from "@/hooks/useDoc";

import BoostCard from "./BoostCard";
import { Boost } from "../../../boosts/types";

const { db } = getFirebase();

type Props = {
  boosts: Boost[];
};

export default function BoostList({ boosts }: Props) {
  // const data = useQuery(db, "boosts", id);

  return (
    <>
      {boosts.map(({ id, message, user, sats, createdAt }) => (
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
