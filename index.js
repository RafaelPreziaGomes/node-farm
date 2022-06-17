const fs = require("fs");
const http = require("http");
const url = require("url");
// // blocking synchrinomous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File written!");

// // non blocking asyncroncronoumous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// console.log("Reading file ...");

// /////////////////////////////////////
//////////////Server///////////////////
////////////////////////////////////////

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  var pathName = req.url;
  if (pathName == "/" || pathName == "/overview") {
    res.end("This is the root");
  } else if (pathName == "/product") {
    res.end("This is the product");
  } else if (pathName == "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    const data = fs.readFile(
      `${__dirname}/dev-data/data.json`,
      "utf-8",
      (err, data) => {
        const productData = JSON.parse(data);
        console.log(productData);
      }
    );
    res.end("API");
  } else {
    res.end("Page not found!");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
