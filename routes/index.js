const express = require("express");
const authMiddleware = require("../middleware/auth");
const roleCheckMiddleware = require("../middleware/roleCheck");
const userController = require("../controllers/UserController");
const beaconController = require("../controllers/BeaconController");
const devicesController = require("../controllers/DeviceController");
const presenceController = require("../controllers/PresenceController.js");
const presenceDetailController = require("../controllers/PresenceDetailController.js");
const rolesController = require("../controllers/RoleController.js");
const roomsController = require("../controllers/RoomController.js");
const schedulesController = require("../controllers/ScheduleController.js");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// User
router.post("/users/login", userController.login);

// Beacon
router.get("/beacons", authMiddleware, beaconController.getBeacons);
router.post(
  "/beacons/find/proximity",
  authMiddleware,
  beaconController.getBeaconByProximity
);
router.post("/beacons/create", authMiddleware, beaconController.createBeacons);
router.get("/beacons/:id", authMiddleware, beaconController.getBeaconsById);
router.put(
  "/beacons/update/:id",
  authMiddleware,
  beaconController.updateBeacons
);
router.delete(
  "/beacons/delete/:id",
  authMiddleware,
  beaconController.deleteBeacons
);

// Device
router.get("/devices/", authMiddleware, devicesController.getDevices);
router.post("/devices/create", authMiddleware, devicesController.createDevices);
router.get("/devices/:id", authMiddleware, devicesController.getDevicesById);
router.put(
  "/devices/update/:id",
  authMiddleware,
  devicesController.updateDevices
);
router.delete(
  "/devices/delete/:id",
  authMiddleware,
  devicesController.deleteDevices
);

// Presence & Presence Detail
router.get("/presences/", authMiddleware, presenceController.getPresences);
router.post("/presences/find", authMiddleware, presenceController.findClasses);
router.post("/presences/open", authMiddleware, presenceController.openPresence);
router.put(
  "/presences/close",
  authMiddleware,
  presenceController.closePresence
);
router.get(
  "/presences/active",
  authMiddleware,
  presenceController.getActivePresence
);
router.get(
  "/presences/:id",
  authMiddleware,
  presenceController.getPresencesById
);
router.put(
  "/presences/update/:id",
  authMiddleware,
  presenceController.updatePresences
);
router.delete(
  "/presences/delete/:id",
  authMiddleware,
  presenceController.deletePresences
);

router.get(
  "/presences-detail",
  authMiddleware,
  roleCheckMiddleware.admin,
  presenceDetailController.getPresenceDetail
);
router.post(
  "/presences/create",
  authMiddleware,
  presenceDetailController.presence
);
router.post(
  "/presences-detail/create",
  authMiddleware,
  roleCheckMiddleware.admin,
  presenceDetailController.createPresenceDetail
);
router.post(
  "/presences-detail/delete/:id",
  authMiddleware,
  roleCheckMiddleware.admin,
  presenceDetailController.deletePresenceDetail
);
router.get(
  "/presences/detail/:id",
  authMiddleware,
  presenceDetailController.getDetailClass
);

// Role
router.get("/roles/", authMiddleware, rolesController.getRoles);
router.post("/roles/create", authMiddleware, rolesController.createRoles);
router.put("/roles/update/:id", authMiddleware, rolesController.updateRoles);
router.delete("/roles/delete/:id", authMiddleware, rolesController.deleteRoles);
router.get("/roles/:id", authMiddleware, rolesController.getRolesById);

// Room
router.get("/rooms/", authMiddleware, roomsController.getRooms);
router.post("/rooms/create", authMiddleware, roomsController.createRooms);
router.put("/rooms/update/:id", authMiddleware, roomsController.updateRooms);
router.delete("/rooms/delete/:id", authMiddleware, roomsController.deleteRooms);
router.get("/rooms/:id", authMiddleware, roomsController.getRoomsById);

// Schedule
router.get("/schedules/", authMiddleware, schedulesController.getSchedules);
router.get(
  "/schedules/today",
  authMiddleware,
  schedulesController.getSchedulesToday
);
router.post(
  "/schedules/create",
  authMiddleware,
  roleCheckMiddleware.admin,
  schedulesController.createSchedules
);
router.put(
  "/schedules/update/:id",
  authMiddleware,
  roleCheckMiddleware.admin,
  schedulesController.updateSchedules
);
router.delete(
  "/schedules/delete/:id",
  authMiddleware,
  roleCheckMiddleware.admin,
  schedulesController.deleteSchedules
);
router.get(
  "/schedules/:id",
  authMiddleware,
  schedulesController.getSchedulesById
);

module.exports = router;
