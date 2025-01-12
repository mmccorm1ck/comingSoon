import { renderToString } from "react-dom/server";
import "dotenv/config";

const platform = process.env.PLATFORM || "Instagram";
const link     = process.env.LINK || "https://google.com";

const server = Bun.serve({
  port: process.env.PORT || 3000,
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
  
  return new Response("Not found", {status: 404});
}

function SMLink() {
  return(
    <a role = "button" href = {link} class = "outline secondary" >Check us out on {platform}</a>
  ); 
}
