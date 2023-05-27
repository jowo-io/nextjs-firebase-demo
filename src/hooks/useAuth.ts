import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import getFirebase from "@/utils/firebase";

const { auth } = getFirebase();

function useAuth() {
  const [isReady, setReady] = useState(false);
  const [user, setUser] = useState(auth?.currentUser);
  const [error, setError] = useState("");

  useEffect(() => {
    const stateListener = onAuthStateChanged(
      auth,
      async (user) => setUser(user),
      (error) => {
        console.error(error);
        setError(error.message);
      }
    );
    return () => {
      stateListener();
      setReady(true);
    };
  }, []);

  const isEmpty = isReady ? !auth : true;

  return { user, isReady, isError: !!error, isEmpty };
}

export default useAuth;
