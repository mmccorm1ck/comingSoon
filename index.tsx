import { renderToString } from "react-dom/server";
import "dotenv/config";

const platform = process.env.PLATFORM;
const link     = process.env.LINK;

const server = Bun.serve({
  port: 3000,
  fetch: fetchHandler
});

console.log("Running on port "+server.port);

function fetchHandler(request:Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file("index.html"));
  }
  
  if (url.pathname === "/smLink" && request.method === "GET") {
    return new Response(renderToString(<SMLink/>));
  }
  
  if (url.pathname === "/link" && request.method === "GET") {
    return new Response()
  }

  return new Response("Not found", {status: 404});
}

function SMLink() {
  return(
    <a role = "button" href = {link} class = "outline secondary" >Check us out on {platform}</a>
  ); 
}
