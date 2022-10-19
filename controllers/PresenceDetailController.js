const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const moment_tz = require("moment-timezone");
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
      const { presence_id, user_id } = req.params;

      const response = await prisma.presences_details.findMany({
        where: {
          AND: {
            presence_id: Number(presence_id),
            user_id: Number(user_id),
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

  getPresenceDetailByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const user_id = req.user.user_id;

      const response = await prisma.presences_details.findMany({
        where: {
          AND: {
            user_id,
            presence_date: date.toISOString(),
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
      const now = moment_tz().tz("Asia/Jakarta").format();

      const is_presence_exist = await prisma.presences.findFirst({
        where: {
          presence_id: Number(presence_id),
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
          presence_detail_id: Number(presence_detail_id),
        },
      });

      res.status(200).json({ message: "Data Deleted!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  presence: async (req, res) => {
    try {
      const { proximity_uuid } = req.body;
      const { user_id, study_group_id } = req.user;
      const now = new moment().format();
      const dayNow = new moment().format("dddd");
      let response = null;

      // Get Day Now
      const day = await prisma.days.findFirst({
        where: { day: dayNow },
        select: { day_id: true },
      });

      // Get Beacon by Proximity
      const beacon_data = await prisma.beacons.findFirst({
        where: { proximity_uuid },
      });
      if (!beacon_data) {
        return res.status(404).json({ message: "Beacon Not Found!" });
      }

      // Get Room by Beacon ID
      const room_data = await prisma.rooms.findFirst({
        where: {
          beacon_id: beacon_data.beacon_id,
        },
      });
      if (!beacon_data) {
        return res.status(404).json({ message: "Beacon Not Found!" });
      }

      // Find Presence by Room ID, Is Open TRUE, Study Group ID from Subject Schedule
      const subject_schedule_data = await prisma.subjects_schedules.findFirst({
        where: {
          AND: {
            room_id: room_data.room_id,
            study_group_id,
            day_id: day.day_id,
          },
        },
      });
      if (!subject_schedule_data) {
        return res.status(404).json({ message: "Schedule Not Found!" });
      }

      const presence_data = await prisma.presences.findFirst({
        where: {
          AND: {
            is_open: true,
            close_time: null,
            subject_schedule_id: subject_schedule_data.subject_schedule_id,
          },
        },
      });
      if (!presence_data) {
        return res.status(404).json({ message: "Presence Not Found!" });
      }

      if (presence_data.waiting_room === true) {
        response = await prisma.presences_details.create({
          data: {
            presence_id: Number(presence_data.presence_id),
            user_id: user_id,
            is_inclass: true,
            presence_date: now,
            presence_time: now,
            created_at: now,
          },
        });
      } else {
        response = await prisma.presences_details.create({
          data: {
            presence_id: Number(presence_data.presence_id),
            user_id: user_id,
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
      let response = null;

      const presence_data = await prisma.presences.findFirst({
        where: {
          presence_id: Number(presence_id),
        },
      });
      if (!presence_data)
        return res.status(404).json({ message: "Presence Isn't Exist!" });

      if (presence_data.waiting_room)
        response = await prisma.presences_details.findMany({
          where: {
            AND: {
              presence_id: Number(presence_id),
              is_admited: true,
            },
          },
        });
      else
        response = await prisma.presences_details.findMany({
          where: {
            presence_id: Number(presence_id),
          },
          include: {
            users: {
              select: {
                fullname: true,
                gender: true,
                sid_eid: true,
                study_groups: {
                  select: {
                    name: true,
                  },
                },
              },
            },
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
