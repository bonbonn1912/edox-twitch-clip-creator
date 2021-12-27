const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes.js');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/", routes);



