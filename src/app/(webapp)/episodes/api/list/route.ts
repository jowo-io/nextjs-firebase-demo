import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import getFirebase from "@/utils/firebase";

import { Episode } from "../../types";

const { db } = getFirebase();

export async function POST(req: Request) {
  try {
    const episodes: Episode[] = [];
    const querySnapshot = await getDocs(collection(db, "episodes"));
    querySnapshot.forEach((doc) => {
      episodes.push(doc.data() as Episode);
    });
    return NextResponse.json(episodes);
  } catch (e) {
    console.error(e);
    return new Response("unauthorized", {
      status: 401,
    });
  }
}
