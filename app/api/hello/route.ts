export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return new Response(JSON.stringify({ foo: "bar" }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
