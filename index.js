const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4080;
const morgan = require("morgan");
const loginProtect = require("./middleware/loginProtect");

const gymRoutes = require("./routes/gymRoutes");
const planRoutes = require("./routes/planRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const memberRoutes = require("./routes/memberRoutes");
const trainerRoutes = require("./routes/trainerRoutes");



app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Welcome to the FitAdmin...");
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is up and running");
});

app.use("/gym", gymRoutes);
app.use("/plan", planRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/member", memberRoutes);
app.use("/trainer", trainerRoutes);

app.listen(PORT, () => {
  console.log(`server is ready and listening on port ${PORT}`);
});
