import pino from "pino";

const logger = pino({
  redact: {
    paths: [
      "password",
      "req.headers.authorization",
      "user.email",
      "*.password",
      "data.token",
      "token",
    ],

    placeholder: "*** [SENSITIVE DATA MASKED] ***",
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss.l o",
    },
  },
});

export default logger;
