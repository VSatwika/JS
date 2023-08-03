const http = require("http");
const fs = require("fs");
const portno = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let scriptContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
      throw err;
    }
    registrationContent = registration;
  });
  fs.readFile("script.js", (err, script) => {
    if (err) {
      throw err;
    }
    scriptContent = script;
  });
  
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
        case "/registration.html":
            response.write(registrationContent);
            response.end();
            break;
        case "/script.js":
        response.write(scriptContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(portno.port);