const bodyParser = require("body-parser");
const express = require("express");

const authRoutes = require("./routes/auth");

const sequelize = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;

sequelize
  .sync({ force: true })
  .then(() => app.listen(PORT, () => console.log(`listening on port: ${PORT}`)))
  .catch((err) => console.log(err));
