import Image from "next/image";
import Link from "next/link";

import { PathNames } from "@/client/utils/links";

import AuthForm from "./AuthForm";

export default function Page() {
  return (
    <section className="mt-6 rounded bg-gray-300 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-6">
        <Link
          href={PathNames.home}
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            height={28}
            width={113}
            src="/fountain-banner-transparent.png"
            alt="Fountain Logo"
          />
        </Link>

        <AuthForm />
      </div>
    </section>
  );
}
