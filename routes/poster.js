const express = require('express');
const router = express.Router();
const posterController = require('../controllers/poster-controller');
const userController = require('../controllers/user-controller');
const constants = require('../constants/constants');
const jwt_decode = require('jwt-decode'); 
const multer = require('multer');
const upload = multer({ dest: 'upload/'});
const type = upload.single('file');
const fs = require('fs');
const moment = require('moment');


router.post('/addImage', type, (req,res)=>{
    try {
        const destPath=`upload\\posters\\${req.body.id}\\${req.file.originalname}\\${moment().format("DD-MM-YY, h-mm-ss")} HS_${req.file.filename}_${req.file.originalname}`;
        if (!fs.existsSync(`upload/posters/`)){
            fs.mkdirSync(`upload/posters/`);
        }

        if (!fs.existsSync(`upload/posters/${req.body.id}`)){
            fs.mkdirSync(`upload/posters/${req.body.id}`);
        }

        if (!fs.existsSync(`upload/posters/${req.body.id}/${req.file.originalname}`)){
            fs.mkdirSync(`upload/posters/${req.body.id}/${req.file.originalname}`);
        }        

        const src = fs.createReadStream(req.file.path);
        const dest = fs.createWriteStream(destPath);
        src.pipe(dest);
        src.on('end', async function() { 
            //req.poster = await posterController.update(req.body.id, {file: destPath});
            req.poster = await posterController.update(req.body.id, {file_path: destPath});
            res.json(req.poster);
        });
        src.on('error', function(err) { res.render('error'); });
        
    } catch (error) {
        res.json({message : error.message})
    }
    
});

router.post('/add',async (req,res)=>{
    try {
        req.map =  await posterController.add(req.body);
        res.json(req.map);
    } catch (error) {
        res.json({message : error.message})
    }
});


router.get('/list',async (req,res)=>{
    try {
        let { id } = req.params;
        req.map = await posterController.getPoster(id);
        res.json(req.map);

    } catch (error) {
        res.json({message : error})
    }
});


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