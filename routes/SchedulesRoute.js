const express = require("express")

const schedulesController = require("../controllers/SchedulesController.js")

const router = express.Router();

router.get('/', schedulesController.getSchedules);
router.get('/:id', schedulesController.getSchedulesById);
router.post('/create', schedulesController.createSchedules);
router.patch('/:id', schedulesController.updateSchedules);
router.delete('/:id', schedulesController.deleteSchedules);

module.exports = router;
