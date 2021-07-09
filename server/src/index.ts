import express from "express";
import cors from "cors";
import "./loaders/connection";
import dotenv from "dotenv";

// Import routes
import router from "./routes";
import config from "./config/index";

// The dotenv file should be parsed before any imports requiring process.env, such as CONFIG
// tslint:disable-next-line:no-var-requires
const result = dotenv.config();

if (result.error) {
  throw new Error("Error parsing dotenv");
}

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (config.env === "development") {
  app.use(cors({ origin: "*" }));
} else if (config.env === "production") {
  app.use(
    cors({ origin: "https://client-prod-dot-journey-288113.et.r.appspot.com" })
  );
} else {
  app.use(cors({ origin: "https://journey-288113.et.r.appspot.com" }));
}

// Add routes to app
app.use("/", router);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info("listening on port: ", config.port);
});

export default app;
