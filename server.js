const express = require('express');
const bodyParser = require('body-parser');

// var morgan = require('morgan');
const app = express();
// var cors = require('cors');

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use(cors());

app.listen(3030, () => {
  console.log('Server started on port 3030');
});
