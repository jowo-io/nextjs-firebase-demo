import { getServerAuth } from "@/utils/firebase/admin";

export const revalidate = false;

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
      Here are your server rendered auth details
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </p>
  );
}
