const express = require("express");
const cors = require("cors");
const diagnosesRouter = require("./routes/diagnosis");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
	response.send("<h1>Home Page</h1>");
});

app.use("/api/diagnoses", diagnosesRouter);

module.exports = app;
