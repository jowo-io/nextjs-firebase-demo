export default function Page() {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Dynamic Data</h1>

      <ul>
        <li>
          Dynamic, or server-rendered data, is fetched fresh on each request.
        </li>
        <li>In this example, the post responses are explicitly not cached.</li>
        <li>
          Try navigating to each post and noting the timestamp of when the page
          was rendered.
        </li>
      </ul>
    </div>
  );
}
