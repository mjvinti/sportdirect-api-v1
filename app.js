const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");
const orgsRoutes = require("./routes/orgs");
const usersRoutes = require("./routes/users");

const sequelize = require("./db");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/orgs", orgsRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 8080;

sequelize
  .sync({ force: true })
  .then(() => app.listen(PORT, () => console.log(`listening on port: ${PORT}`)))
  .catch((err) => console.log(err));
