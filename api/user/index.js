const express = require('express');
const router = express.Router();
const controller = require('./user.controller');



/*app.js 에서 app.use('/users', require('./api/user')); 으로
users에 대한 요청 처리를 명시해 줬으므로, 경로에서 /users는 제외해준다.
ex) /users/:id (X)
    /:id (O)   
*/
router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

module.exports = router;