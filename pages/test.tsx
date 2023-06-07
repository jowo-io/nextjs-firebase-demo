import { PathNames } from "@/client/utils/links";
import { getServerAuth } from "@/utils/firebase/admin.pages";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log();
  const { user } = await getServerAuth(context);
  console.log({ user });
  return { props: { user: user || null } };
};

export default function Page({ user }: { user: any }) {
  return (
    <div>
      <Link href={PathNames.home}>Back</Link>
      <br />
      <h1>Pages directory</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
