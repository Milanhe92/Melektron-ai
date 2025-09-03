// functions/api/[[path]].js
export async function onRequest({ request, next }) {
  // API logika ovde
  return new Response(JSON.stringify({ message: "Melektron API" }), {
    headers: { 'Content-Type': 'application/json' },
  });
}