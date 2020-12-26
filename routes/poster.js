const express = require('express');
const router = express.Router();
const posterController = require('../controllers/posterController');
const jwt_decode = require('jwt-decode'); 
const multer = require('multer');
const upload = multer({ dest: 'upload/'});
const type = upload.single('file');


router.post('/addImage', type, posterController.addImage);

router.post('/add', posterController.add);


router.get('/list', posterController.getPoster);

router.get('/:id', posterController.getPosterById);

router.post('/update/:id', posterController.update);

router.delete('/remove/:id',async (req,res)=>{
    try {
        let { id } = req.params;
        req.poster = await posterController.remove(id);
        res.json(req.poster);
    } catch (error) {
        res.json({message : error.message})
    }
});


module.exports = router;