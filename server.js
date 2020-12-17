const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;
const path = __dirname + '/build/'

//Report controllers
const basic = require('./routes/basic');
const rls = require('./routes/rls');

//App middlewares
app.use(helmet.hidePoweredBy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path));
app.use(cors());

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

//API routes
app.use('/basic', basic);
app.use('/rls', rls);

//Server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});