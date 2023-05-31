"use client";

import Link from "next/link";
import Image from "next/image";

import { PathNames } from "@/client/utils/links";

import useAuth from "@/hooks/useAuth";

export interface Props {}

export default function Nav({}: Props) {
  const { user } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-gray-200 bg-gray-500 dark:bg-gray-900">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href={PathNames.home} className="flex items-center">
          <Image
            height={28}
            width={113}
            src="/fountain-banner-transparent.png"
            alt="Fountain Logo"
          />
        </Link>

        <div className="flex flex-row items-center gap-3">
          <Link href={PathNames.account} className="flex items-center">
            <Image
              width={28}
              height={28}
              className="rounded-full"
              src={user?.image || "/fallback-avatar.png"}
              alt={"Avatar"}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
