const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');



/*app.js 에서 app.use('/users', require('./api/user')); 으로
users에 대한 요청 처리를 명시해 줬으므로, 경로에서 /users는 제외해준다.
ex) /users/:id (X)
    /:id (O)   
*/
/*
//users
router.get('/', userController.index);
router.get('/all', userController.show);
router.delete('/:id', userController.destroy);
router.post('/', userController.create);
*/
//TODO
router.post('/login', userController.login);
router.post('/create', userController.create);
router.post('/update', userController.update);
router.post('/delete', userController.delete);

module.exports = router;