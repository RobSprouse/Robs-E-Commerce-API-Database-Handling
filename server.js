// COMMENT: imports the required module
const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

// COMMENT: initializes the server
const app = express();
const PORT = process.env.PORT || 3001;

// COMMENT: sets up the Express.js app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// COMMENT: sets up the Express.js app to use the routes
app.use(routes);

// COMMENT: sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log("Now listening"));
});
