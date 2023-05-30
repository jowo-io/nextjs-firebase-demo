"use server";

async function getData() {
  await new Promise((r) => setTimeout(r, 5000));

  return ["foo", "bar"];
}

export default async function Page() {
  const data = await getData();

  return <p className="text-black dark:text-white">stats: {data}</p>;
}
