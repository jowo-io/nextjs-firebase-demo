import { env } from "@/env.mjs";
import { credential } from "firebase-admin";
import { initializeApp, App, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

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

// create global singleton
const getFirebase = (() => {
  return () => {
    try {
      if (!global?.firebase?.app) {
        global.firebase.app = initializeApp(firebaseConfig);
        global.firebase.auth = getAuth(global.firebase.app);
        global.firebase.db = getFirestore(global.firebase.app);
      }
    } catch (e) {
      console.error("[@utils/getFirebase]", e);
    } finally {
      return global.firebase;
    }
  };
})();

export default getFirebase;
