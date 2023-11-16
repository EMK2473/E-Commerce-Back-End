const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Loud and clear on port ${PORT}!`);
});
