"use client";

import { useEffect, useState } from "react";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import getFirebase from "@/utils/firebase";
import Spinner from "@/client/ui/atoms/Spinner";
import { cx } from "class-variance-authority";

const { auth } = getFirebase();

type Props = {
  url: string;
};

export default function AuthForm({ url }: Props) {
  console.log("args", url);

  const isCallback = isSignInWithEmailLink(auth, url);
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(isCallback);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);

  async function triggerSendSignInLinkToEmail() {
    try {
      setError(false);
      setSubmitting(true);
      await sendSignInLinkToEmail(auth, email, {
        url,
        handleCodeInApp: true,
      });
      setSubmitted(true);
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    (async () => {
      if (isCallback) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt(
            "Please provide your email for confirmation"
          ) as string;
        }
        try {
          setLoading(true);
          await signInWithEmailLink(auth, email, url);
          setSuccess(true);
        } catch (error) {
          console.error(error);
          setError(true);
        } finally {
          window.localStorage.removeItem("emailForSignIn");
          setLoading(false);
        }
      }
    })();
  }, []);

  if (isLoading) {
    return <Spinner size="sm" intent="secondary" className="m-auto" />;
  }

  if (isSuccess) {
    return <>Success!</>;
  }

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Enter your email
        </h1>

        {isSubmitted && (
          <div
            className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <strong className="font-bold">Email sent!</strong>
            <span className="block sm:inline">
              Please check your email and click the authentication link
              provided.
            </span>
          </div>
        )}
        {isError && (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">Authentication failed!</strong>
            <span className="block sm:inline">
              The authentication attempt failed. Please refresh and try again.
            </span>
          </div>
        )}
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
              disabled={isSubmitting || isSubmitted}
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
            className="mt-2 h-12 w-full rounded bg-blue-500 px-4  py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:bg-blue-500"
            disabled={isSubmitting || isSubmitted}
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
  );
}
