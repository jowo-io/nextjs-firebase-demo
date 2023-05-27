import Image from "next/image";
import Link from "next/link";

import { getLink, PathNames } from "@/client/utils/links";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";

async function getData() {
  await new Promise((r) => setTimeout(r, 5000));

  return [
    {
      id: "123",
      image: "/mock/closing-the-loop.jpg",
      title: "#32 - Jeff Booth: Bitcoin is the Answer to a Broken System",
      description:
        "Today’s guest is Jeff Booth, a serial technology entrepreneur, advisor and board member to multiple businesses and organizations, and the author of the very popular book...",
      url: getLink("viewEpisode", { id: "closing-the-loop" }),
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      {data.map(({ id, image, title, description, url }) => (
        <div
          key={id}
          className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <Link href={url}>
            <Image
              width={200}
              height={200}
              className="w-full rounded-t-lg"
              src={image}
              alt=""
            />
          </Link>
          <div className="p-5">
            <Link href={url}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
            <div>
              <Link
                href={url}
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 "
              >
                <span>Listen</span>{" "}
                <MusicalNoteIcon className="inline h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
