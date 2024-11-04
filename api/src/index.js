import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";

import register from "./routers/register.js";
import login from "./routers/login.js";
import dashboard from "./routers/dashboard.js";
import application from "./routers/application.js";
import document from "./routers/document.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/register", register);
apiRouter.use("/login", login);
apiRouter.use("/dashboard", dashboard);
apiRouter.use("/application", application);
apiRouter.use("/document", document);

apiRouter.get("/", async (req, res) => {
  res.json("This is welcoming page of FONA Api");
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
