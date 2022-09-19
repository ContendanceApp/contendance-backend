const express = require("express")

const presenceController = require("../controllers/PresencesController.js");

const router = express.Router();

router.get('/', presenceController.getPresences);
router.get('/:id', presenceController.getPresencesById);
router.patch('/:id', presenceController.updatePresences);
router.delete('/:id', presenceController.deletePresences);

module.exports=router;
