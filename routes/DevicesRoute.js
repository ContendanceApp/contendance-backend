const express = require("express")

const devicesController = require("../controllers/DevicesController")

const router = express.Router();

router.get('/', devicesController.getDevices);
router.get('/:id', devicesController.getDevicesById);
router.post('/create', devicesController.createDevices);
router.patch('/:id', devicesController.updateDevices);
router.delete('/:id', devicesController.deleteDevices);

module.exports = router;
