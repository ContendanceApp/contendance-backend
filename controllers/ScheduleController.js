const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const moment_tz = require("moment-timezone");

const prisma = new PrismaClient();

module.exports = {
  getSchedules: async (req, res) => {
    try {
      const response = await prisma.subjects_schedules.findMany({
        include: {
          days: {
            select: {
              day: true,
            },
          },
          subjects: {
            select: {
              name: true,
            },
          },
          rooms: {
            select: {
              name: true,
              room_code: true,
              location: true,
            },
          },
          users: {
            select: {
              fullname: true,
              roles: {
                select: {
                  role: true,
                },
              },
            },
          },
          study_groups: {
            select: {
              name: true,
            },
          },
        },
      });

      response.forEach((item) => {
        item.start_time = new moment(item.start_time).format("HH:mm");
        item.finish_time = new moment(item.finish_time).format("HH:mm");

        delete item.created_at;
        delete item.updated_at;
      });

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getSchedulesById: async (req, res) => {
    try {
      const response = await prisma.subjects_schedules.findUnique({
        where: {
          subject_schedule_id: Number(req.params.id),
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

  getSchedulesToday: async (req, res) => {
    try {
      const { study_group_id, user_id } = req.user;
      const dayNow = moment_tz().tz("Asia/Jakarta").format("dddd");

      const { day_id } = await prisma.days.findFirst({
        where: { day: dayNow },
        select: { day_id: true },
      });

      let response = null;

      if (study_group_id !== null) {
        response = await prisma.subjects_schedules.findMany({
          where: {
            AND: {
              study_group_id,
              day_id,
            },
          },
          include: {
            subjects: {},
            users: {
              select: {
                fullname: true,
              },
            },
            days: {},
            study_groups: {},
            rooms: {},
          },
        });
      } else {
        response = await prisma.subjects_schedules.findMany({
          where: {
            AND: {
              user_id,
              day_id,
            },
          },
          include: {
            subjects: {},
            users: {
              select: {
                fullname: true,
              },
            },
            days: {},
            study_groups: {},
            rooms: {},
          },
        });
      }

      response.forEach((item) => {
        item.start_time = new moment(item.start_time).format("HH:mm");
        item.finish_time = new moment(item.finish_time).format("HH:mm");

        delete item.created_at;
        delete item.updated_at;
        delete item.subjects.created_at;
        delete item.subjects.updated_at;
        delete item.days.created_at;
        delete item.days.updated_at;
        delete item.study_groups.created_at;
        delete item.study_groups.updated_at;
        delete item.rooms.created_at;
        delete item.rooms.updated_at;
      });

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createSchedules: async (req, res) => {
    try {
      const {
        subject_id,
        user_id,
        study_group_id,
        room_id,
        day_id,
        start_time,
        finish_time,
      } = req.body;

      const response = await prisma.subjects_schedules.create({
        data: {
          subject_id,
          user_id,
          study_group_id,
          room_id,
          day_id,
          start_time,
          finish_time,
        },
      });

      res.status(201).json({ message: "Data Created!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateSchedules: async (req, res) => {
    const {
      subject_id,
      user_id,
      study_group_id,
      room_id,
      start_time,
      finish_time,
    } = req.body;
    try {
      const subjects_schedules = await prisma.subjects_schedules.update({
        where: {
          subject_schedule_id: Number(req.params.id),
        },
        data: {
          subject_id: subject_id,
          user_id: user_id,
          study_group_id: study_group_id,
          room_id: room_id,
          start_time: start_time,
          finish_time: finish_time,
        },
      });
      res.status(201).json(subjects_schedules);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  deleteSchedules: async (req, res) => {
    try {
      const subjects_schedules = await prisma.subjects_schedules.delete({
        where: {
          subject_schedule_id: Number(req.params.id),
        },
      });
      if (!subjects_schedules) {
        return res.status(404).json({ message: "Not Found!", data: [] });
      }

      res.status(200).json({ message: "Data Deleted!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
