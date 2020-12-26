const express = require('express');
const router = express.Router();
const posterController = require('../controllers/posterController');
const multer = require('multer');
const upload = multer({ dest: 'upload/'});
const type = upload.single('file');


router.post('/addImage', type, posterController.addImage);

router.post('/add', posterController.add);


router.get('/list', posterController.getPoster);

router.get('/:id', posterController.getPosterById);

router.post('/update/:id', posterController.update);

router.delete('/remove/:id', posterController.remove);


module.exports = router;