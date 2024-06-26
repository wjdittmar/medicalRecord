var path = require("path");
const express = require("express");
const cors = require("cors");
const diagnosesRouter = require("./routes/diagnosis");
const patientRouter = require("./routes/patient");
const providerRouter = require("./routes/provider");
const visitRouter = require("./routes/visit");
const { userRouter } = require("./routes/users");
const loginRouter = require("./routes/login");
const epicRouter = require("./routes/epic");
const messageRouter = require("./routes/message");
const middleware = require("./middleware/authMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

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


module.exports = app;