require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { createRols, setPermission } = require('./config/initial.setup');

//Db connection
const connectDB = require('./config/connection');

//Routers
const authRouter = require('./routes/auth.route');
const genreRouter = require('./routes/genre.route');
const authorRouter = require('./routes/author.route');
const bookRouter = require('./routes/book.route');
const lendRouter = require('./routes/lend.route');
const userRouter = require('./routes/user.route');
const rolRouter = require('./routes/rol.route');
const permRouter = require('./routes/permission.route');

// Midlewares
const authenticateUser = require('./middleware/authentication');

// Error handlers

// Security and others
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Inital DB values
createRols();
setPermission();


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/genre', authenticateUser, genreRouter);
app.use('/api/v1/author', authenticateUser, authorRouter);
app.use('/api/v1/book', authenticateUser, bookRouter);
app.use('/api/v1/lend', authenticateUser,lendRouter);
app.use('/api/v1/user', authenticateUser, userRouter);
app.use('/api/v1/rol', authenticateUser, rolRouter);
app.use('/api/v1/permis', authenticateUser, permRouter);

// Server  
const port = process.env.PORT || 8000;

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, ()=>
      console.log(`Server is listening on port ${port}`)
    );
  } catch(err){
    console.error(err);
  }
}

start();
