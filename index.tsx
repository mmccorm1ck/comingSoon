const server = Bun.serve({
  port: 3000,
  fetch: fetchHandler
});

console.log("Running on port "+server.port);

function fetchHandler(request:Request): Promise<Response> {
  return new Response(Bun.file("index.html"));
}
