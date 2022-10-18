const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  getDevices: async function (req, res) {
    try {
      const response = await prisma.devices.findMany();
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getDeviceById: async function (req, res) {
    try {
      const response = await prisma.devices.findUnique({
        where: {
          device_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createDevice: async function (req, res) {
    const { user_id, mac_address } = req.body;
    try {
      const response = await prisma.devices.create({
        data: {
          user_id: user_id,
          mac_address: mac_address,
        },
      });
      res.status(201).json({ message: "Data Created!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateDevice: async function (req, res) {
    try {
      const { user_id, mac_address } = req.body;
      const response = await prisma.devices.update({
        where: {
          device_id: Number(req.params.id),
        },
        data: {
          user_id: user_id,
          mac_address: mac_address,
        },
      });
      res.status(200).json({ message: "Data Updated!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteDevice: async function (req, res) {
    try {
      await prisma.devices.delete({
        where: {
          device_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Deleted!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
