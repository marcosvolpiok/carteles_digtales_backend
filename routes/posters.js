const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map-controller');
const userController = require('../controllers/user-controller');
const constants = require('../constants/constants');
const jwt_decode = require('jwt-decode'); 

router.get('/', async (req,res)=>{
    res.json('**** Welcome to Digital Posters ****');
}); 

router.post('/poster/create',async (req,res)=>{
    try {
        let { mapSize, bombCount } = req.body;
        let cells = mapController.createMap(mapSize, mapSize);
        cells = mapController.fillMap(cells, constants.messages.BOMB , req.body.bombCount );
        cells = mapController.adjacentCellsValues(cells, constants.messages.BOMB);
        req.map =  mapController.saveMap(mapSize, bombCount, cells);

        var userProfile = jwt_decode(req.headers.authorization);
        userController.updateUser(userProfile.userId, {map_id: req.map._id});
        res.json(req.map);
    } catch (error) {
        res.json({message : error})
    }
});


router.get('/poster/list',async (req,res)=>{
    try {
        let { id } = req.params;
        req.map = await mapController.getMap(id);
        res.status(201).json(req.map);

    } catch (error) {
        res.json({message : error})
    }
});


router.get('/poster/:id',async (req,res)=>{
    try {
        let { id } = req.params;
        req.map = await mapController.getMap(id);
        res.status(201).json(req.map);

    } catch (error) {
        res.json({message : error})
    }
});

router.post('/poster/update',async (req,res)=>{
    try {
        let { mapSize, bombCount, selectedCells, cells, _id } = req.body;
        req.map = await mapController.saveMap(mapSize, bombCount, cells, selectedCells, _id);
        res.status(201).json(req.map);

    } catch (error) {
        res.json({message : error})
    }
});


module.exports = router;