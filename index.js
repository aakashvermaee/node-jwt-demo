require("./config");

const port = process.env.PORT || 2018;

const http = global.getPackage("http");

const server = http.createServer((req, res) => {
  res.write("Welcome");
  res.end();
});

server.listen(port, () => {
  process.logger(`App running on port: ${port}`);
});
