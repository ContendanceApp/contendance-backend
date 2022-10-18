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
router.get("/users/me", authMiddleware, userController.me);

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
router.post("/devices/create", authMiddleware, devicesController.createDevice);
router.get("/devices/:id", authMiddleware, devicesController.getDeviceById);
router.put(
  "/devices/update/:id",
  authMiddleware,
  devicesController.updateDevice
);
router.delete(
  "/devices/delete/:id",
  authMiddleware,
  devicesController.deleteDevice
);

// Presence & Presence Detail
// Presence Controller
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
  presenceController.getPresenceById
);
router.put(
  "/presences/update/:id",
  authMiddleware,
  presenceController.updatePresence
);
router.put(
  "/presences/waiting-room/enable",
  authMiddleware,
  presenceController.toggleWaitingRoom
);
router.delete(
  "/presences/delete/:id",
  authMiddleware,
  presenceController.deletePresence
);

// Presence Detail Controller
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
  "/presences-detail/:id",
  authMiddleware,
  roleCheckMiddleware.admin,
  presenceDetailController.getPresenceDetailById
);
router.get(
  "/presences-detail/:date",
  authMiddleware,
  presenceDetailController.getPresenceDetailByDate
);
router.get(
  "/presences/detail/:id",
  authMiddleware,
  presenceDetailController.getDetailClass
);
router.get(
  "/presences/waiting-room/:id",
  authMiddleware,
  presenceDetailController.getListOfWaitingRoom
);
router.post(
  "/presences/waiting-room/admit",
  authMiddleware,
  presenceDetailController.admitWaitingRoom
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
