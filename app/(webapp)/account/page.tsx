import { getServerAuth } from "@/utils/firebase/admin";

async function getData() {
  const { user } = await getServerAuth();

  return {
    user,
  };
}

export default async function Page() {
  const data = await getData();
  return (
    <p className="text-black dark:text-white">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </p>
  );
}
