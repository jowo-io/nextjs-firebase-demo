import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";

import getFirebase from "@/utils/firebase";

import { Episode } from "../../../(webapp)/episodes/types";

const { db } = getFirebase();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const querySnapshot = await getDoc(doc(db, "episodes", id));
    const episode = querySnapshot.data() as Episode;

    return NextResponse.json(episode);
  } catch (e) {
    console.error(e);
    return new Response("unauthorized", {
      status: 401,
    });
  }
}
