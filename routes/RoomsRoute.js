const express = require("express")

const roomsController = require("../controllers/RoomsController.js")

const router = express.Router();

router.get('/', roomsController.getRooms);
router.get('/:id', roomsController.getRoomsById);
router.post('/create', roomsController.createRooms);
router.patch('/:id', roomsController.updateRooms);
router.delete('/:id', roomsController.deleteRooms);

module.exports = router;
