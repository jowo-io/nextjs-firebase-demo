import { doc, DocumentData, Firestore, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";

export function useDoc(
  firestore: Firestore,
  path: string,
  ...pathSegments: string[]
) {
  const [data, setData] = useState<DocumentData>();

  useEffect(() => {
    const unsub = onSnapshot(doc(firestore, path, ...pathSegments), (snap) => {
      const data = snap.data();
      if (data) {
        setData(data);
      }
    });

    return () => unsub();
  }, []);

  return data;
}
