import path from "path";
import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosis";
import patientRouter from "./routes/patient";
import providerRouter from "./routes/provider";
import visitRouter from "./routes/visit";
import { userRouter } from "./routes/user";
import loginRouter from "./routes/login";
import epicRouter from "./routes/epic";
import messageRouter from "./routes/message";
import middleware from "./middleware/authMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

app.use(express.static("dist"));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);
app.use("/api/providers", providerRouter);
app.use("/api/visits", visitRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/epic", epicRouter);
app.use("/api/messages", messageRouter);
app.use(errorMiddleware);

/* final catch-all route to index.html defined last */
app.get("/*", (req, res) => {
	res.sendFile(path.resolve("dist/index.html"));
});

export default app;
