import { collection, getDocs } from "firebase/firestore";
import getFirebase from "@/utils/firebase";

import LiveCard from "./LiveCard";

const { db } = getFirebase();

type Episode = {
  id: string;
  image: string;
  title: string;
  summary: string;
  sats: number;
};

async function getData(): Promise<Episode[]> {
  await new Promise((r) => setTimeout(r, 1000));

  const episodes: Episode[] = [];

  const querySnapshot = await getDocs(collection(db, "episodes"));
  querySnapshot.forEach((doc) => {
    episodes.push(doc.data() as Episode);
  });

  return episodes;
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      {data.map(({ id, image, title, summary, sats }) => (
        <LiveCard
          key={id}
          id={id}
          image={image}
          title={title}
          summary={summary}
          sats={sats}
        />
      ))}
    </div>
  );
}
