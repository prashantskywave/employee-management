// const express = require("express");
// const app = express();

// app.use(express.json());
// app.use("/api/employees", require("./routes/employee.routes"));

// module.exports = app;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/employees", require("./routes/employee.routes"));

module.exports = app;
