const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const moment_tz = require("moment-timezone");

const prisma = new PrismaClient();

module.exports = {
  getSubjectsSchedulesByStudyGroup: async (req, res) => {
    try {
      const { study_group_id, role_id, user_id } = req.user;
      let response = null;

      if (role_id == 1) {
        response = await prisma.subjects_schedules.findMany({
          where: {
            study_group_id,
          },
          include: {
            days: {
              select: {
                day: true,
              },
            },
            rooms: {
              select: {
                name: true,
                room_code: true,
                location: true,
              },
            },
            subjects: {
              select: {
                name: true,
                acronym: true,
              },
            },
            users: {
              select: {
                fullname: true,
                sid_eid: true,
              },
            },
          },
        });
      } else {
        response = await prisma.subjects_schedules.findMany({
          where: {
            user_id,
          },
          include: {
            study_groups: {
              select: {
                name: true,
              },
            },
            days: {
              select: {
                day: true,
              },
            },
            rooms: {
              select: {
                name: true,
                room_code: true,
                location: true,
              },
            },
            subjects: {
              select: {
                name: true,
                acronym: true,
              },
            },
            users: {
              select: {
                fullname: true,
                sid_eid: true,
              },
            },
          },
        });
      }
      if (!response) {
        return res.status(404).json({ message: "Not Found!", data: [] });
      }

      response.forEach((item) => {
        item.start_time = new moment(item.start_time).format("HH:mm");
        item.finish_time = new moment(item.finish_time).format("HH:mm");

        delete item.created_at;
        delete item.updated_at;
        delete item.subject_id;
        delete item.user_id;
        delete item.study_group_id;
        delete item.room_id;
        delete item.day_id;
      });

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};