const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const prisma = new PrismaClient();

module.exports = {
  getPresenceDetail: async (req, res) => {
    try {
      const response = await prisma.presences_details.findMany();
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getPresenceDetailById: async (req, res) => {
    try {
      const { user_id } = req.params;

      const response = await prisma.presences_details.findMany({
        where: {
          user_id,
        },
      });
      if (!response) {
        res.status(404).json({ message: "Not Found!", data: [] });
      }

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getPresenceDetailByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const user_id = req.user.user_id;

      const response = await prisma.presences_details.findMany({
        where: {
          AND: {
            user_id,
            presence_date: date,
          },
        },
      });
      if (!response) {
        res.status(404).json({ message: "Not Found!", data: [] });
      }

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createPresenceDetail: async (req, res) => {
    try {
      const { presence_id, user_id } = req.body;
      const now = new moment().format();

      const is_presence_exist = await prisma.presences.findFirst({
        where: {
          presence_id,
        },
      });
      if (!is_presence_exist)
        return res.status(404).json({ message: "Data Not Found!" });

      const response = await prisma.presences_details.create({
        data: {
          presence_id: Number(presence_id),
          user_id: Number(user_id),
          presence_date: now,
          presence_time: now,
          created_at: now,
        },
      });

      res.status(201).json({ message: "Data Created!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deletePresenceDetail: async (req, res) => {
    try {
      const { presence_detail_id } = req.params;
      const response = await prisma.presences_details.delete({
        where: {
          presence_detail_id,
        },
      });

      res.status(200).json({ message: "Data Deleted!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  presence: async (req, res) => {
    try {
      const { presence_id } = req.body;
      const user_id = req.user.user_id;
      const now = new moment().format();

      const is_presence_exist = await prisma.presences.findFirst({
        where: {
          presence_id,
        },
      });
      if (!is_presence_exist)
        return res.status(404).json({ message: "Data Not Found!" });

      const is_class_open = await prisma.presences.findFirst({
        where: {
          is_open: true,
        },
      });
      if (!is_class_open)
        return res.status(404).json({ message: "Data Not Found!" });

      let response = null;

      if (is_class_open.waiting_room === true) {
        response = await prisma.presences_details.create({
          data: {
            presence_id: Number(presence_id),
            user_id: Number(user_id),
            is_inclass: true,
            presence_date: now,
            presence_time: now,
            created_at: now,
          },
        });
      } else {
        response = await prisma.presences_details.create({
          data: {
            presence_id: Number(presence_id),
            user_id: Number(user_id),
            is_admited: true,
            is_inclass: true,
            presence_date: now,
            presence_time: now,
            created_at: now,
          },
        });
      }

      res.status(201).json({ message: "Data Created!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getDetailClass: async (req, res) => {
    try {
      const { presence_id } = req.params;

      const has_waiting_room = await prisma.presences.findFirst({
        where: {
          presence_id,
        },
        select: {
          waiting_room,
        },
      });

      const response = null;

      if (has_waiting_room)
        response = await prisma.presences_details.findMany({
          where: {
            AND: {
              presence_id,
              is_admited: true,
            },
          },
        });
      else
        response = await prisma.presences_details.findMany({
          where: {
            presence_id,
          },
        });

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getListOfWaitingRoom: async (req, res) => {
    try {
      const { presence_id } = req.params;
      const response = await prisma.presences_details.findMany({
        where: {
          AND: {
            presence_id,
            is_admited: false,
          },
        },
      });
      if (!response) {
        return res.status(404).json({ message: "Not Found!", data: [] });
      }

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  admitWaitingRoom: async (req, res) => {
    try {
      const { presence_id, user_id } = req.body;
      const response = await prisma.presences_details.update({
        where: {
          AND: {
            presence_id,
            user_id,
          },
        },
        data: {
          is_admited: true,
        },
      });
      if (!response) {
        return res.status(404).json({ message: "Not Found!", data: [] });
      }

      res.status(200).json({ message: "User Admited!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
