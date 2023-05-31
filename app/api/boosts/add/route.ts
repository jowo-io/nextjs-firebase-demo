import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";

import getFirebase from "@/utils/firebase";
import { Boost } from "@/app/(webapp)/boosts/types";

const { db } = getFirebase();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const boosts: Boost[] = [];
    const boostsRef = collection(db, "boosts");
    const q = query(boostsRef, where("episodeId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const boost = doc.data();
      boost.createdAt = boost.createdAt.toDate();
      boosts.push(boost as Boost);
    });
    return NextResponse.json(boosts);
  } catch (e) {
    console.error(e);
    return new Response("unauthorized", {
      status: 401,
    });
  }
}
