const express = require("express");
const cors = require("cors");
const diagnosesRouter = require("./routes/diagnosis");
const patientRouter = require("./routes/patient");
const providerRouter = require("./routes/provider");
const visitRouter = require("./routes/visits");
const app = express();

app.use(express.static("dist"));

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
	response.send("<h1>Home Pages</h1>");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);
app.use("/api/providers", providerRouter);
app.use("/api/visits", visitRouter);

module.exports = app;