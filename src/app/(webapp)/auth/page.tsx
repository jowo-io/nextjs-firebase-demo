"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sendSignInLinkToEmail } from "firebase/auth";

import getFirebase from "@/utils/firebase";
import { PathNames } from "@/client/utils/links";
import { env } from "@/env.mjs";
import Spinner from "@/client/ui/atoms/Spinner";

const { auth } = getFirebase();

export default function Auth() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  async function triggerSendSignInLinkToEmail() {
    try {
      setSubmitting(true);
      await sendSignInLinkToEmail(auth, email, {
        url: env.NEXT_PUBLIC_SITE_URL + PathNames.home,
        handleCodeInApp: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
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
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Enter your email
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                triggerSendSignInLinkToEmail();
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  disabled={isSubmitting}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="mt-2 h-12 w-full rounded bg-blue-500 px-4  py-2 text-sm font-bold text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner size="sm" intent="secondary" className="m-auto" />
                ) : (
                  "Login / Signup"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
