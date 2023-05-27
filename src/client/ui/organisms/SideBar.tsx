"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpCircleIcon,
  WifiIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  MusicalNoteIcon,
} from "@heroicons/react/20/solid";

import { PathNames } from "@/client/utils/links";
import getFirebase from "@/utils/firebase";
import useAuth from "@/hooks/useAuth";

const { auth } = getFirebase();

export interface Props {}

export default function Nav({}: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const links = [
    { text: "Chart", path: "", Icon: ArrowUpCircleIcon },
    { text: "Shows", path: "", Icon: WifiIcon },
    { text: "Episodes", path: PathNames.listEpisodes, Icon: MusicalNoteIcon },
    { text: "Wallet", path: "", Icon: CurrencyDollarIcon },
    { text: "Account", path: PathNames.account, Icon: Cog6ToothIcon },
  ];

  return (
    <aside
      id="default-sidebar"
      className="fixed left-0 top-14 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="p h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {links.map(({ text, Icon, path }) => {
            return (
              <li key={`link-${text}`}>
                {path ? (
                  <Link
                    className="flex  items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    href={path}
                  >
                    <Icon className="h-7 w-7 text-white" />

                    <span className="ml-3">{text}</span>
                  </Link>
                ) : (
                  <span className="flex cursor-default items-center rounded-lg p-2 text-gray-900 opacity-40 dark:text-white">
                    <Icon className="h-7 w-7 text-white" />

                    <span className="ml-3">{text}</span>
                  </span>
                )}
              </li>
            );
          })}
          <li>
            <button
              onClick={
                user
                  ? () => void auth.signOut()
                  : () => router.push(PathNames.auth)
              }
              className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              {user ? "Sign out" : "Sign in"}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
