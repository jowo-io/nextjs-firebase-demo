"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpCircleIcon,
  WifiIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  MusicalNoteIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";

import { PathNames } from "@/client/utils/links";
import getFirebase from "@/utils/firebase/client";
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
      className="fixed left-0 top-14 z-40 h-screen w-10 sm:w-64"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-300 px-1 py-4 dark:bg-gray-800 sm:px-3">
        <ul className="space-y-2 font-medium">
          {links.map(({ text, Icon, path }) => {
            return (
              <li key={`link-${text}`}>
                {path ? (
                  <Link
                    className="flex items-center rounded-lg p-1 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    href={path}
                  >
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />

                    <span className="ml-3 hidden sm:inline">{text}</span>
                  </Link>
                ) : (
                  <span className="flex cursor-default items-center rounded-lg p-1 text-gray-900 opacity-40 dark:text-white sm:p-2">
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />

                    <span className="ml-3 hidden sm:inline">{text}</span>
                  </span>
                )}
              </li>
            );
          })}
          <li>
            <button
              onClick={
                user
                  ? async () => {
                      try {
                        const res = await fetch("/api/auth/signout", {
                          method: "POST",
                          cache: "no-store",
                          body: JSON.stringify({ userId: user.id }),
                        });
                        if (!res.ok) {
                          throw new Error("Failed to fetch data");
                        }
                        auth.signOut();
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  : () => router.push(PathNames.auth)
              }
              className="mt-2 w-full rounded bg-blue-500 px-1 py-2 text-sm font-bold text-white hover:bg-blue-700 sm:px-4"
            >
              <span className="inline sm:hidden">
                {user ? (
                  <ArrowLeftOnRectangleIcon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                ) : (
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                )}
              </span>

              <span className="ml-3 hidden sm:inline">
                {user ? "Sign out" : "Sign in"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
