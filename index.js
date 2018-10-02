require("./config");

const port = process.env.PORT || 2018;

const http = global.getPackage("http");
const url = global.getPackage("url");
const fs = global.getPackage("fs");

const jwt = global.getPackage("jwt");

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
      root(req, res);
      break;
    case "/login":
      login(req, res);
      break;
    case "/signup":
      signup(req, res);
      break;
    default:
      fs.readFile(`${__dirname}/resources/404.jpg`, (err, data) => {
        if (err) throw err;
        res.statusCode = 404;
        res.write(data);
        res.end();
      });
      break;
  }
};

const root = function root(req, res) {
  fs.readFile(`${__dirname}/resources/welcome.jpg`, (err, data) => {
    if (err) throw err;
    res.write(data);
    res.end();
  });
}

const login = function login(req, res) {
  const cookie = req.headers["cookie"];
  if (cookie) {
    const { xauth } = JSON.parse(cookie);
    validateToken(req, res, xauth);
  } else {
    res.writeHead(302, { "Location": `http://${req.headers["host"]}/signup` });
    res.end();
  }
}

const signup = function signup(req, res) {
  const xauth = { xauth: "35adde95a88eb339baac32fb45dd1bc87b3ba6cc" };
  res.setHeader("Set-Cookie", [JSON.stringify(xauth)]);
  res.writeHead(302, { "Location": `http://${req.headers["host"]}/login` });
  res.end();
}

const validateToken = function validateToken(req, res, token) {
  if (!token) {
    res.write("UnAuthorised Access!");
    res.end();
  } else {
    res.writeHead(302, { "Location": `http://${req.headers["host"]}/` });
    res.end();
  }
}