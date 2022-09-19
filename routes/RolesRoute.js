const express = require("express")

const rolesController = require("../controllers/RolesController.js");

const router = express.Router();

router.get('/', rolesController.getRoles);
router.get('/:id', rolesController.getRolesById);
router.post('/create', rolesController.createRoles);
router.patch('/:id', rolesController.updateRoles);
router.delete('/:id', rolesController.deleteRoles);

module.exports=router;
