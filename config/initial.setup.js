const Rols = require('../models/rol.model');
const Permission = require('../models/permission.model');
const User = require('../models/user.model');
const { USER_SCR, GENRE_SCR, AUTHOR_SCR, 
        BOOK_SCR, LEND_SCR, ROL_SCR, PERM_SRC,
        FIRST_USER_NAME, FIRST_USER_LAST,
        FIRST_USER_EMAIL, FIRST_USER_PASS } = require('../config/env');

/* Creating Rols */
const createRols = async() => {
  try {

    const rolCounter = await Rols.estimatedDocumentCount();
  
    if(rolCounter > 0) return;
  
    const rols =  await Promise.all([
      new Rols({name: 'admin'}).save(),
      new Rols({name: 'librarian'}).save(),
      new Rols({name: 'reader'}).save(),
      new Rols({name: 'visitor'}).save()
    ]);

    console.log(rols);
    
  } catch (error) {
    console.error(error);
  }

}

/* Creating permissions for admin user */
const setPermission = async() => {
  try {
    const permissionCounter = await Permission.estimatedDocumentCount();

    if(permissionCounter > 0 ) return;

    const getAdminId = await Rols.findOne({name:'admin'});

    if(!getAdminId) return;

    const permiss = await Promise.all([
       new Permission({ screen_name:'ROL', screen_code:ROL_SCR, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save(),
       new Permission({ screen_name:'PERMISSION', screen_code:PERM_SRC, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save(),
       new Permission({ screen_name:'USER', screen_code:USER_SCR, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save(),
       new Permission({ screen_name:'GENRE', screen_code:GENRE_SCR, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save(),
       new Permission({ screen_name:'AUTHOR', screen_code:AUTHOR_SCR, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save(),
       new Permission({ screen_name:'BOOK', screen_code:BOOK_SCR, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save(),
       new Permission({ screen_name:'LEND', screen_code:LEND_SCR, can_create: true, can_edit: true, can_watch: true, rol: getAdminId}).save()
       
    ]);
    console.log(permiss);

  } catch(error){
    console.error(error);
  }
}

/* CREATING FIRST USER */

const firstUser = async() => {
  try {
    const isFirstUser = await User.countDocuments();
    if(isFirstUser > 0) return;
    const getAdminId = await Rols.findOne({name:'admin'});
    
    if(!getAdminId) return;

    new User({
      name:FIRST_USER_NAME,
      lastName:FIRST_USER_LAST,
      email:FIRST_USER_EMAIL,
      password:FIRST_USER_PASS,
      rol:getAdminId
    }).save();

  } catch (error) {
    console.error(error);
  }
}


module.exports = {createRols, setPermission, firstUser}
