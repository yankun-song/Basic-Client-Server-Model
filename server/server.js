const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http
  .createServer((request, response) => {
    // if is GETting CSS
    if (request.method === "GET" && request.url === "/style.css") {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(fs.readFileSync("./server/style.css"));
      response.end();

      // if is GETting homepage
    } else if (request.method === "GET" && request.url === "/") {
      // print the current folder. It is NOT the same as where current file locates
      console.log(process.cwd());
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(fs.readFileSync(__dirname + "/index.html"));
      response.end();

      // if is POSTing
    } else if (request.method === "POST" && request.url === "/sayHi") {
      fs.appendFileSync("./server/hi_log.txt", "Somebody said hi.\n");
      response.write("hi back to you!");
      response.end();

      // if is POSTing
    } else if (request.method === "POST" && request.url === "/greeting") {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        fs.appendFileSync("./server/hi_log.txt", body + "\n");
        let responseMessage = "good morning";
        if (body === "hello") responseMessage = "hello there!";
        if (body === "what's up") responseMessage = "the sky";
        response.write(responseMessage);
        response.end();
      });
    } else {
      response.writeHead(404);
      response.end("Error: Not Found");
    }
  })
  .listen(3000);

module.exports = server;
