const express = require('express');
const router = express.Router();
const posterController = require('../controllers/posterController');
const multer = require('multer');
const upload = multer({ dest: 'upload/'});
const type = upload.single('file');
const checkAuth = require('../middleware/checkAuth');


router.post('/addImage', checkAuth, type, posterController.addImage);

router.post('/add', checkAuth, posterController.add);


router.get('/list', checkAuth, posterController.getPoster);

router.get('/listByUserId/:id', posterController.getByUserId);



router.get('/:id', checkAuth, posterController.getPosterById);

router.post('/update/:id', checkAuth, posterController.update);

router.delete('/remove/:id', checkAuth, posterController.remove);


module.exports = router;