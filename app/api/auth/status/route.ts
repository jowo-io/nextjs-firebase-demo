import { cookies } from "next/headers";

import getFirebase from "../../../../utils/firebase/admin";

export async function POST(req: Request) {
  try {
    const { auth } = getFirebase();
    const sessionCookie = cookies().get("session")?.value;

    if (sessionCookie) {
      const { user_id: userId } = await auth.verifySessionCookie(
        sessionCookie,
        true
      );

      const customToken = await auth.createCustomToken(userId);

      return new Response(JSON.stringify({ customToken }), {
        status: 200,
      });
    }
  } catch (e) {
    console.error(e);
  }

  return new Response("unauthorized", {
    status: 401,
  });
}
