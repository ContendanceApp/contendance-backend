const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  getRoles: async function (req, res) {
    try {
      const response = await prisma.roles.findMany();
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getRolesById: async function (req, res) {
    try {
      const response = await prisma.roles.findUnique({
        where: {
          role_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createRoles: async function (req, res) {
    const { role } = req.body;
    try {
      const roles = await prisma.roles.create({
        data: {
          role: role,
        },
      });
      res.status(201).json({ message: "Data Created!", data: roles });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateRoles: async function (req, res) {
    const { role } = req.body;
    try {
      const roles = await prisma.roles.update({
        where: {
          role_id: Number(req.params.id),
        },
        data: {
          role: role,
        },
      });
      res.status(201).json({ message: "Data Updated!", data: roles });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteRoles: async function (req, res) {
    try {
      const roles = await prisma.roles.delete({
        where: {
          role_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Deleted!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
