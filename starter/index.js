const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// console.log(textIn);
// const textOut = `This is what we know about avacado: ${textIn} \n Date ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHTML = dataObj
      .map((card) => replaceTemplate(card, tempCard))
      .join("\n");
    let overview = tempOverview.replace("{%TEMPLETE_CARDS%}", cardsHTML);
    res.end(overview);
  }
  //product
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = replaceTemplate(dataObj[query.id], tempProduct);
    res.end(product);
  }
  //API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //Invalid pages
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "My-own-header": "Hi there!",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});
server.listen(8000, "127.0.0.1", () =>
  console.log("Listening to requests on port 8000")
);
