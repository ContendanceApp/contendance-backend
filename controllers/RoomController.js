const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  getRooms: async function (req, res) {
    try {
      const response = await prisma.rooms.findMany();
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getRoomsById: async function (req, res) {
    try {
      const response = await prisma.rooms.findUnique({
        where: {
          room_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createRooms: async function (req, res) {
    const { beacon_id, name, room_code, location, description } = req.body;
    try {
      const rooms = await prisma.rooms.create({
        data: {
          beacon_id: Number(beacon_id),
          name,
          room_code,
          location,
          description,
        },
      });
      res.status(201).json(rooms);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateRooms: async function (req, res) {
    const { beacon_id, name, room_code, location, description } = req.body;
    try {
      const response = await prisma.rooms.update({
        where: {
          room_id: Number(req.params.id),
        },
        data: {
          beacon_id: Number(beacon_id),
          name,
          room_code,
          location,
          description,
        },
      });
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteRooms: async function (req, res) {
    try {
      await prisma.rooms.delete({
        where: {
          room_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Deleted!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
