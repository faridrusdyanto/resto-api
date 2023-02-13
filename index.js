const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const port = 3030;

// parse application/json
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(morgan('dev'));
app.use(cors());

// Daftarkan menu routes
app.use("/", router)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
