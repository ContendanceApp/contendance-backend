const express = require("express")

const beaconController = require("../controllers/BeaconController")

const router = express.Router();

router.get('/', beaconController.getBeacons);
router.get('/:id', beaconController.getBeaconsById);
router.post('/create', beaconController.createBeacons);
router.patch('/:id', beaconController.updateBeacons);
router.delete('/:id', beaconController.deleteBeacons);

module.exports = router;
