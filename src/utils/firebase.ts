import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGVE5H7JO0gHOYAsgBniXfIw25LKIaD5s",
  projectId: "fountain-demo",
  appId: "fountain-demo",
};

const getFirebase = (() => {
  let app: FirebaseApp | undefined;
  let auth: Auth | undefined;
  let db: Firestore | undefined;

  return () => {
    if (app && auth && db) {
      return { app, auth, db };
    }
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      console.log("getAuth", auth);
      //   db = getFirestore(app);
    } catch (e) {
      console.error("[@utils/getFirebase]", e);
    } finally {
      return {
        app: app as FirebaseApp,
        auth: auth as Auth,
        db: db as Firestore,
      };
    }
  };
})();

export default getFirebase;
