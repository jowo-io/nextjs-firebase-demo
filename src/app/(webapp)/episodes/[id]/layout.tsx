import React from "react";
import { Metadata, ResolvingMetadata } from "next";

type MetadataProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  // read route params
  const { id } = params;
  console.log({ id });

  // fetch data
  // ... axios => id ...
  const episode = { title: "Episode " + id };

  return {
    title: episode.title,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg"],
    // },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}
