const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  getBeacons: async (req, res) => {
    try {
      const response = await prisma.beacons.findMany();
      res.status(200).json({
        message: "Data Retrieved!",
        data: response,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBeaconsById: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await prisma.beacons.findUnique({
        where: {
          beacon_id: Number(id),
        },
      });
      if (!response) {
        res.status(404).json({ message: "Data Not Found!" });
        return;
      }
      res.status(200).json({
        message: "Data Retrieved!",
        data: response,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBeaconByProximity: async (req, res) => {
    try {
      const { proximity_uuid } = req.body;
      const response = await prisma.beacons.findFirst({
        where: { proximity_uuid },
      });
      if (!response) {
        return res.status(404).json({ message: "Data Not Found!" });
      }
      res.status(200).json({
        message: "Data Retrieved!",
        data: response,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBeacons: async (req, res) => {
    try {
      const { major, minor, proximity_uuid } = req.body;
      const beacons = await prisma.beacons.create({
        data: {
          major: Number(major),
          minor: Number(minor),
          proximity_uuid,
        },
      });
      res.status(201).json({
        message: "Data Created!",
        data: beacons,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateBeacons: async (req, res) => {
    try {
      const { major, minor, proximity_uuid } = req.body;
      const { id } = req.params;
      const beacons = await prisma.beacons.update({
        where: {
          beacon_id: Number(id),
        },
        data: {
          major: Number(major),
          minor: Number(minor),
          proximity_uuid: proximity_uuid,
        },
      });
      res.status(200).json({
        message: "Data Updated!",
        data: beacons,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBeacons: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.beacons.delete({
        where: {
          beacon_id: Number(id),
        },
      });
      res.status(200).json({
        message: "Data Deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
