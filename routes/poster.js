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


router.get('/:id',async (req,res)=>{
    try {
        let { id } = req.params;
        req.map = await posterController.getPosterById(id);
        res.json(req.map);

    } catch (error) {
        res.json({message : error.message})
    }
});

router.post('/update/:id',async (req,res)=>{
    try {
        let { id } = req.params;
        req.poster = await posterController.update(id, req.body);
        res.json(req.poster);
    } catch (error) {
        res.json({message : error.message})
    }
});

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