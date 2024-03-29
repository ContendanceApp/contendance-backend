const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const moment_tz = require("moment-timezone");
const prisma = new PrismaClient();

module.exports = {
  getPresenceDetail: async (req, res) => {
    try {
      const response = await prisma.presences_details.findMany({
        include: {
          presences: {
            include: {
              rooms: {
                select: {
                  name: true,
                  room_code: true,
                },
              },
            },
          },
          users: {
            select: {
              fullname: true,
              email: true,
              sid_eid: true,
              gender: true,
              study_groups: {
                select: {
                  name: true,
                  year: true,
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
      if (!response)
        return res
          .status(404)
          .json({ message: "Data Not Found!", data: response });

      res
        .status(200)
        .json({ message: "Partisipan Berhasil Dihapus!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  presence: async (req, res) => {
    try {
      const { proximity_uuid } = req.body;
      const { user_id, study_group_id } = req.user;
      const dayNow = new moment_tz().tz("Asia/Jakarta").format("dddd");
      const now = new moment_tz().tz("Asia/Jakarta").format();
      const dateNow = new moment_tz()
        .tz("Asia/Jakarta")
        .startOf("date")
        .format();
      let subject_schedule_data = null;
      let response = null;

      // Get Day Now
      const day = await prisma.days.findFirst({
        where: { day: dayNow },
      });

      const beacon_data = await prisma.beacons.findFirst({
        where: { proximity_uuid },
      });
      if (!beacon_data)
        return res.status(404).json({ message: "Beacon Not Found!" });

      const room_data = await prisma.rooms.findFirst({
        where: {
          beacon_id: beacon_data.beacon_id,
        },
      });
      if (!room_data)
        return res.status(404).json({ message: "Room Not Found!" });

      const old_presence = await prisma.presences_details.findFirst({
        where: {
          user_id,
          is_inclass: true,
        },
      });

      if (old_presence) {
        subject_schedule_data = await prisma.subjects_schedules.findFirst({
          where: {
            AND: {
              room_id: room_data.room_id,
              study_group_id,
              day_id: day.day_id,
              presences: {
                some: {
                  AND: {
                    is_open: true,
                    close_time: null,
                  },
                  NOT: {
                    presence_id: old_presence.presence_id,
                  },
                },
              },
            },
          },
          include: {
            presences: {
              select: {
                presence_id: true,
                is_open: true,
                close_time: true,
              },
            },
            subjects: {
              select: {
                name: true,
              },
            },
            users: {
              select: {
                fullname: true,
              },
            },
          },
        });
      } else {
        subject_schedule_data = await prisma.subjects_schedules.findFirst({
          where: {
            AND: {
              room_id: room_data.room_id,
              study_group_id,
              day_id: day.day_id,
              presences: {
                some: {
                  AND: {
                    is_open: true,
                    close_time: null,
                  },
                },
              },
            },
          },
          include: {
            presences: {
              select: {
                presence_id: true,
                is_open: true,
                close_time: true,
              },
            },
            subjects: {
              select: {
                name: true,
              },
            },
            users: {
              select: {
                fullname: true,
              },
            },
          },
        });
      }

      if (!subject_schedule_data)
        return res.status(404).json({ message: "Schedule Not Found!" });

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
            presence_date: dateNow,
            presence_time: now,
            created_at: now,
          },
          include: {
            presences: {
              include: {
                rooms: {
                  select: {
                    name: true,
                    room_code: true,
                    location: true,
                  },
                },
                subjects_schedules: {
                  select: {
                    start_time: true,
                    finish_time: true,
                  },
                },
                users: {
                  select: {
                    fullname: true,
                    sid_eid: true,
                    role_id: true,
                  },
                },
              },
            },
          },
        });
      } else {
        response = await prisma.presences_details.create({
          data: {
            presence_id: Number(presence_data.presence_id),
            user_id: user_id,
            is_admited: true,
            is_inclass: true,
            presence_date: dateNow,
            presence_time: now,
            created_at: now,
          },
          include: {
            presences: {
              include: {
                rooms: {
                  select: {
                    name: true,
                    room_code: true,
                    location: true,
                  },
                },
                subjects_schedules: {
                  select: {
                    start_time: true,
                    finish_time: true,
                    subjects: true,
                  },
                },
                users: {
                  select: {
                    fullname: true,
                    sid_eid: true,
                    role_id: true,
                  },
                },
              },
            },
          },
        });
      }

      response.presence_time = new moment(response.presence_time).format(
        "HH:mm"
      );
      response.presences.subjects_schedules.start_time = new moment(
        response.presences.subjects_schedules.start_time
      ).format("HH:mm");
      response.presences.subjects_schedules.finish_time = new moment(
        response.presences.subjects_schedules.finish_time
      ).format("HH:mm");
      response.presence_date = new moment(response.presence_date).format(
        "dddd, D MMMM yyy HH:mm"
      );

      res.status(201).json({ message: "Data Created!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getDetailClass: async (req, res) => {
    try {
      const { presence_id } = req.params;
      let data = null;
      let users = null;

      const presence_data = await prisma.presences.findFirst({
        where: {
          presence_id: Number(presence_id),
        },
        include: {
          rooms: {
            select: {
              name: true,
              room_code: true,
              location: true,
            },
          },
          subjects_schedules: {
            include: {
              subjects: {
                select: {
                  name: true,
                  acronym: true,
                },
              },
            },
          },
        },
      });
      if (!presence_data)
        return res.status(404).json({ message: "Presence Isn't Exist!" });

      presence_data.open_time = new moment(presence_data.open_time).format(
        "HH:mm"
      );
      presence_data.presence_date = new moment(
        presence_data.presence_date
      ).format("dddd, D MMMM yyy HH:mm");
      presence_data.subjects_schedules.start_time = new moment(
        presence_data.subjects_schedules.start_time
      ).format("HH:mm");
      presence_data.subjects_schedules.finish_time = new moment(
        presence_data.subjects_schedules.finish_time
      ).format("HH:mm");

      delete presence_data.created_at;
      delete presence_data.updated_at;
      delete presence_data.subjects_schedules.created_at;
      delete presence_data.subjects_schedules.updated_at;

      data = presence_data;

      if (presence_data.waiting_room)
        users = await prisma.presences_details.findMany({
          orderBy: {
            created_at: "desc",
          },
          where: {
            AND: {
              presence_id: Number(presence_id),
              is_admited: true,
            },
          },
          include: {
            presences: {
              include: {
                rooms: {},
              },
            },
          },
        });
      else
        users = await prisma.presences_details.findMany({
          where: {
            presence_id: Number(presence_id),
          },
          orderBy: {
            created_at: "desc",
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

      users.forEach((item) => {
        item.presence_time = new moment(item.presence_time).format("HH:mm");
        item.presence_date = new moment(item.presence_date).format(
          "dddd, D MMMM yyy HH:mm"
        );

        delete item.created_at;
        delete item.updated_at;
      });

      delete data.subject_schedule_id;
      delete data.room_id;
      delete data.user_id;
      delete data.subjects_schedules.subject_id;
      delete data.subjects_schedules.day_id;
      delete data.subjects_schedules.room_id;
      delete data.subjects_schedules.user_id;
      delete data.subjects_schedules.study_group_id;

      data = { ...data, users };

      res.status(200).json({ message: "Data Retrieved!", data });
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
