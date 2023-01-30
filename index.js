const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const port = 3030;

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Daftarkan menu routes
app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
