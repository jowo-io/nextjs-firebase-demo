import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithCustomToken,
} from "firebase/auth";
import getFirebase from "@/utils/firebase/client";

const { auth } = getFirebase();

export type User = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  displayName?: string;
  image?: string;
};

function cleanFirebaseUser(user: FirebaseUser | null): User | undefined {
  return user
    ? {
        id: user.uid,
        email: user.email as string,
        isEmailVerified: user.emailVerified,
        displayName: user.displayName || "Frodo",
        image: user.photoURL || "/frodo.png",
      }
    : undefined;
}

function useAuth() {
  const [isReady, setReady] = useState(false);
  const [user, setUser] = useState<User | undefined>(
    cleanFirebaseUser(auth?.currentUser)
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const stateListener = onAuthStateChanged(
      auth,
      async (user, ...args) => {
        setUser(cleanFirebaseUser(user));
      },
      (error) => {
        console.error(error);
        setError(error.message);
      }
    );

    (async () => {
      try {
        const res = await fetch("/api/auth/status", {
          method: "POST",
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        if (data.customToken) {
          await signInWithCustomToken(auth, data.customToken);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    })();

    return () => {
      stateListener();
    };
  }, []);

  const isEmpty = isReady ? !auth : true;

  return { user, isReady, isError: !!error, isEmpty };
}

export default useAuth;
