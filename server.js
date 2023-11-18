const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// COMMENT: sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log("Now listening"));
});

/* TODO: 
      GIVEN a functional Express.js API */
/* [ ]: 
      WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
      THEN I am able to connect to a database using Sequelize */
/* [ ]: 
      WHEN I enter schema and seed commands
      THEN a development database is created and is seeded with test data */
/* [ ]: 
      WHEN I enter the command to invoke the application
      THEN my server is started and the Sequelize models are synced to the MySQL database */
/* [ ]: 
      WHEN I open API GET routes in Insomnia for categories, products, or tags
      THEN the data for each of these routes is displayed in a formatted JSON */
/* [ ]: 
      WHEN I test API POST, PUT, and DELETE routes in Insomnia
      THEN I am able to successfully create, update, and delete data in my database */

/* [ ]: 
      Submit a walkthrough video that demonstrates the functionality of the E-Commerce Back End. */

/* [ ]: 
      Your walkthrough video should also show the POST, PUT, and DELETE routes for products and tags being tested in Insomnia. */
