import { getServerAuth } from "@/utils/firebase/admin";

async function getData() {
  await new Promise((r) => setTimeout(r, 1000));

  const { user } = await getServerAuth();

  return {
    user,
  };
}

export default async function Page() {
  const { user } = await getData();
  return (
    <p className="text-black dark:text-white">
      server rendered stats for <b>{user.email}</b> will go here!
    </p>
  );
}
