
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const userRoute = require("./routes/userRoute");


dotenv.config();

// Middleware to parse JSON requests
userRoute.use(express.json());

const app = express();
app.use(cors());
mongoose.connect(process.env.URI)
  .then(() => {
    console.log('connected successfully');
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("running successfully at port number : " + process.env.PORT);
    });
  })
  .catch((err) => { console.error(err); });

app.use('/api/user', userRoute)







