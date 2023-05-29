"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div role="alert">
      <div className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
        Something went wrong
      </div>
      <div className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
        <p>Something not ideal might be happening.</p>
        <button
          className="mt-3 rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
