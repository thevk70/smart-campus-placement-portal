import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api",routes);
app.use(errorHandler);

export default app;