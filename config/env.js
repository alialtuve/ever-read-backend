const dotenv = require('dotenv');
dotenv.config();

const { PORT, JWT_SECRET, JWT_LIFETIME, 
        USER_SCR, GENRE_SCR, AUTHOR_SCR, BOOK_SCR, LEND_SCR, ROL_SCR, PERM_SRC,
        CREATE, EDIT, WATCH, DELETE } = process.env;

module.exports = { 
  PORT, JWT_SECRET, JWT_LIFETIME,  
  USER_SCR, GENRE_SCR, AUTHOR_SCR, BOOK_SCR, LEND_SCR, ROL_SCR, PERM_SRC,
  CREATE, EDIT, WATCH, DELETE
};
