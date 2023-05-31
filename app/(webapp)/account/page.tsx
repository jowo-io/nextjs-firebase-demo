import { headers, cookies } from "next/headers";

import { getLink, PathNames } from "@/client/utils/links";

function getServerAuth() {
  return {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
}

async function getData() {
  await new Promise((r) => setTimeout(r, 5000));
  const auth = getServerAuth();

  console.log("auth", auth);

  return {
    hello: "world",
    auth,
  };
}

export default async function Page() {
  const data = await getData();
  console.log(data);
  return <p className="text-black dark:text-white">welcome</p>;
}
