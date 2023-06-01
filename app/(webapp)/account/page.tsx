import { headers, cookies } from "next/headers";

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
  const auth = getServerAuth();

  return {
    hello: "world",
    auth,
  };
}

export default async function Page() {
  const data = await getData();
  return (
    <p className="text-black dark:text-white">
      <pre>{JSON.stringify(data.auth, null, 2)}</pre>
    </p>
  );
}
