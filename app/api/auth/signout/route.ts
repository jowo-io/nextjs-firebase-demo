import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { env } from "@/env.mjs";
import getFirebase from "../../../../utils/firebase/admin";

const cookieName = "session";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const { auth } = getFirebase();
    await auth.revokeRefreshTokens(userId);

    return new Response("", {
      status: 200,
      headers: {
        "Set-Cookie": `${cookieName}=; Path=/; Max-Age=${0}; ${
          env.NODE_ENV === "production" ? "Secure; " : ""
        }HttpOnly; SameSite=Strict;`,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return new Response("unauthorized", {
    status: 401,
  });
}
