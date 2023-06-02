import { cookies } from "next/headers";
import { credential } from "firebase-admin";
import { initializeApp, App, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import { env } from "@/env.mjs";

const serviceAccount = JSON.parse(
  env.FIREBASE_SERVICE_ACCOUNT
) as ServiceAccount;

const firebaseConfig = {
  credential: credential.cert(serviceAccount),
  projectId: "fountain-demo",
  appId: "fountain-demo",
};

declare global {
  var firebase: {
    app: App;
    auth: Auth;
    db: Firestore;
  };
}

export default function getFirebase() {
  try {
    if (!global?.firebase?.app) {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);
      global.firebase = { app, auth, db };
    }
  } catch (e) {
    console.error("[@utils/getFirebase]", e);
  } finally {
    return global.firebase;
  }
}

export async function getServerAuth() {
  let data: any = {};

  try {
    const { auth } = getFirebase();
    const sessionCookie = cookies().get("session")?.value;
    data.sessionCookie = sessionCookie;

    if (sessionCookie) {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
      data.user = {
        id: decodedClaims.user_id,
        email: decodedClaims.email as string,
        isEmailVerified: decodedClaims.email_verified,
      };
    }
  } catch (e) {
    console.error(e);
  } finally {
    return data;
  }
}
