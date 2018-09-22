require("./config");

const port = process.env.PORT || 2018;

const http = global.getPackage("http");
const url = global.getPackage("url");

const server = http.createServer((req, res) => {
  routeApi(req, res);
});

server.listen(port, () => {
  process.logger(`App running on port: ${port}`);
});

const routeApi = (req, res) => {
  const uri = url
    .parse(req.url)
    .pathname;
  process.logger(uri);

  switch (uri) {
  case "/":
    res.write("Welcome");
    res.end();
    break;
  case "/login":
    res.write("login");
    res.end();
    break;
  }
};
