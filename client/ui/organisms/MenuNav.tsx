"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cx } from "class-variance-authority";

import { PathNames } from "@/client/utils/links";
import getFirebase from "@/utils/firebase/client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const { auth } = getFirebase();

export interface Props {}

export default function Nav({}: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [isMobileMenuVisible, setMobileMenu] = useState(false);

  const links = [{ text: "Listen now", path: PathNames.listEpisodes }];

  return (
    <nav className="border-gray-200 bg-gray-300 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href={PathNames.home} className="flex items-center">
          <Image
            height={28}
            width={113}
            src="/fountain-banner-transparent.png"
            alt="Fountain Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setMobileMenu((prevState) => !prevState)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          className={cx(
            "flex w-full flex-col gap-4 md:w-auto md:flex-row md:gap-10",
            isMobileMenuVisible ? "" : "hidden md:flex"
          )}
        >
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 md:dark:bg-gray-900">
              {links.map(({ text, path }, index) => {
                return (
                  <li key={`link-${text}`}>
                    <Link
                      className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                      aria-current="page"
                      href={path}
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

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
              className="rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
            >
              {user ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
