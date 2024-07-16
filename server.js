require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
//Db connection
const connectDB = require('./config/connection');

//Routers
const authRouter = require('./routes/auth.route');
const genreRouter = require('./routes/genre.route');
const authorRouter = require('./routes/author.route');
const bookRouter = require('./routes/book.route');
const lendRouter = require('./routes/lend.route');
const userRouter = require('./routes/user.route');

// Error handlers

// Security and others
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/genre', genreRouter);
app.use('/api/v1/author', authorRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/lend', lendRouter);
app.use('/api/v1/user', userRouter);

// Server  
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
