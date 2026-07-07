import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "https://smart-campus-frontend-cr2y.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
//app.use(helmet());

app.use("/api",routes);
app.use(errorHandler);

export default app;
