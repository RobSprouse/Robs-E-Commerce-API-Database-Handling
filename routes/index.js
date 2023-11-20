// COMMENT: import all routes
const router = require('express').Router();
const apiRoutes = require('./api');

// COMMENT: add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

// COMMENT: add a route to handle user requests that aren't supported by the API
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// COMMENT: export router
module.exports = router;