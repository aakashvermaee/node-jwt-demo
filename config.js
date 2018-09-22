require("./deps");

process.logger = (msg, err) => {
  if (process.env.NODE_ENV === "development") {
    msg !== undefined
      ? console.warn(msg)
      : console.error(err);
  }
};
