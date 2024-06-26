require('dotenv').config();

//extra security packages
const helmet = require('helmet');
const cors = require('cors');

const express = require('express');
const app = express();

//Data base connection
const connectDB = require('./config/connection');

app.use(express.json());
app.use(helmet());
app.use(cors());

const port = process.env.PORT || 8000;

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, ()=>
      console.log(`Server is listening on port ${port}`)
    );
  } catch(err){
    console.log(err);
  }
}

start();