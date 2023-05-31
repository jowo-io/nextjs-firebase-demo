import { NextResponse } from "next/server";
import { env } from "@/env.mjs";
import getFirebase from "./firebase";

const days = 14;
const expiresIn = 60 * 60 * 24 * days * 1000;
const cookieName = "session";

export async function POST(req: Request) {
  try {
    const { auth } = getFirebase();

    // const cookies = res.cookies.get("session");

    const { idToken } = await req.json();
    console.log({ idToken });

    const cookieValue = await auth.createSessionCookie(idToken, { expiresIn });

    console.log({ cookieValue });

    return new Response("Hello, Next.js!", {
      status: 200,
      headers: {
        "Set-Cookie": `${cookieName}=${cookieValue}; Max-Age=${expiresIn}; ${
          env.NODE_ENV === "production" ? "Secure; " : ""
        }HttpOnly; SameSite=Strict`,
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("unauthorized", {
      status: 401,
    });
  }
}
