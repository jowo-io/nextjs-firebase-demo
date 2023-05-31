import { env } from "@/env.mjs";
import { credential } from "firebase-admin";
import { initializeApp, App, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const serviceAccount = {
  type: "service_account",
  project_id: "fountain-demo",
  private_key_id: env.FIREBASE_PRIVATE_KEY_ID,
  private_key: env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-sjnxi@fountain-demo.iam.gserviceaccount.com",
  client_id: "106220710992742850178",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sjnxi%40fountain-demo.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
} as ServiceAccount;

const firebaseConfig = {
  credential: credential.cert(serviceAccount),
  projectId: "fountain-demo",
  appId: "fountain-demo",
};

// create global singleton
const getFirebase = (() => {
  let app: App | undefined;
  let auth: Auth | undefined;
  let db: Firestore | undefined;

  return () => {
    if (app && auth && db) {
      return { app, auth, db };
    }
    try {
      // app
      app = initializeApp(firebaseConfig);

      // auth
      auth = getAuth(app);

      // db
      //   db = getFirestore(app);
    } catch (e) {
      console.error("[@utils/getFirebase]", e);
    } finally {
      return {
        app: app as App,
        auth: auth as Auth,
        db: db as Firestore,
      };
    }
  };
})();

export default getFirebase;
