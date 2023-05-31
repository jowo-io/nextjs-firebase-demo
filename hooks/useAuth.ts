import { useEffect, useState } from "react";

import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import getFirebase from "@/utils/firebase";

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

  console.log(auth);

  useEffect(() => {
    const stateListener = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          setUser(cleanFirebaseUser(user));
        } else {
          setError("Unknown user");
        }
      },
      (error) => {
        console.error(error);
        setError(error.message);
      }
    );
    setReady(true);
    return () => {
      stateListener();
    };
  }, []);

  const isEmpty = isReady ? !auth : true;

  return { user, isReady, isError: !!error, isEmpty };
}

export default useAuth;
