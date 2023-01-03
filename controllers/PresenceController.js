const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const moment_tz = require("moment-timezone");
moment.locale("id");

const prisma = new PrismaClient();

module.exports = {
  getPresences: async (req, res) => {
    try {
      const response = await prisma.presences.findMany({
        include: {
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
              email: true,
              sid_eid: true,
              roles: {
                select: {
                  role: true,
                },
              },
            },
          },
          subjects_schedules: {
            include: {
              subjects: {
                select: {
                  acronym: true,
                  name: true,
                },
              },
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

  getPresenceById: async (req, res) => {
    try {
      const response = await prisma.presences.findUnique({
        where: {
          presence_id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updatePresence: async (req, res) => {
    const {
      subject_schedule_id,
      room_id,
      user_id,
      is_open,
      open_time,
      close_time,
      presence_date,
    } = req.body;
    try {
      const responses = await prisma.presences.update({
        where: {
          presence_id: Number(req.params.id),
        },
        data: {
          subject_schedule_id: Number(subject_schedule_id),
          room_id: Number(room_id),
          user_id: Number(user_id),
          is_open,
          open_time,
          close_time,
          presence_date,
        },
      });
      res.status(200).json({ message: "Data Updated!", data: responses });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deletePresence: async (req, res) => {
    try {
      const { user_id } = req.user;

      let result = await prisma.presences.findFirst({
        where: {
          AND: {
            user_id: Number(user_id),
            presence_id: Number(req.params.id),
          },
        },
      });
      if (!result) {
        return res.status(404).json({ message: "Data Not Found!" });
      }

      const is_exist = await prisma.presences_details.count({
        where: {
          presence_id: Number(req.params.id),
        },
      });
      if (is_exist > 0) {
        result = await prisma.presences_details.deleteMany({
          where: {
            presence_id: Number(req.params.id),
          },
        });
        if (!result) {
          return res.status(500).json({ message: "Kesalahan Pada Server!" });
        }
      }

      result = await prisma.presences.delete({
        where: {
          presence_id: Number(req.params.id),
        },
      });
      if (!result) {
        return res.status(500).json({ message: "Kesalahan Pada Server!" });
      }

      res.status(200).json({ message: "Presensi Berhasil Dibatalkan!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  findClasses: async (req, res) => {
    try {
      const { proximity } = req.body;
      const user_id = req.user.user_id;
      const dayNow = moment_tz().tz("Asia/Jakarta").format("dddd");

      const beacon = await prisma.beacons.findFirst({
        where: { proximity_uuid: proximity },
      });
      if (!beacon) {
        res.status(404).json({ message: "Beacon Not Found!" });
        return;
      }

      const room = await prisma.rooms.findFirst({
        where: { beacon_id: Number(beacon.beacon_id) },
      });
      if (!room) {
        res.status(404).json({ message: "Room Not Found!" });
        return;
      }

      const day_id = await prisma.days.findFirst({
        where: { day: dayNow },
        select: { day_id: true },
      });

      const subjects_schedule = await prisma.subjects_schedules.findMany({
        where: {
          AND: { room_id: room.room_id, user_id, day_id: day_id.day_id },
        },
        include: {
          rooms: { select: { name: true, room_code: true, location: true } },
          study_groups: { select: { name: true } },
          subjects: { select: { name: true, acronym: true } },
          users: { select: { fullname: true } },
          days: { select: { day_id: true, day: true } },
        },
      });
      if (!subjects_schedule) {
        res.status(404).json({ message: "Schedule Not Found!" });
        return;
      }

      subjects_schedule.forEach((item) => {
        item.start_time = new moment(item.start_time).format("HH:mm");
        item.finish_time = new moment(item.finish_time).format("HH:mm");

        delete item.created_at;
        delete item.updated_at;
      });

      res
        .status(200)
        .json({ message: "Data Retrieved!", data: subjects_schedule });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  openPresence: async (req, res) => {
    try {
      const { subject_schedule_id, room_id } = req.body;
      const user_id = req.user.user_id;
      const dayNow = new moment().format("dddd");

      const day = await prisma.days.findFirst({
        where: {
          day: dayNow,
        },
      });

      const is_legal = await prisma.subjects_schedules.findFirst({
        where: {
          AND: {
            subject_schedule_id: Number(subject_schedule_id),
            user_id,
            // day_id: day.day_id,
          },
        },
      });
      if (!is_legal)
        return res.status(403).json({ message: "Illegal Action!" });

      const is_exist = await prisma.presences.findFirst({
        where: {
          AND: {
            subject_schedule_id: Number(subject_schedule_id),
            room_id: Number(room_id),
            user_id,
            is_open: true,
            close_time: null,
          },
        },
      });
      if (is_exist)
        return res.status(403).json({ message: "Kelas sudah terbuka!" });

      const presence = await prisma.presences.create({
        data: {
          subject_schedule_id: Number(subject_schedule_id),
          room_id: Number(room_id),
          user_id: Number(user_id),
          is_open: true,
          waiting_room: false,
          open_time: moment_tz().tz("Asia/Jakarta").format(),
          close_time: null,
          presence_date: moment_tz().tz("Asia/Jakarta").format(),
        },
        include: {
          users: {
            select: {
              fullname: true,
              sid_eid: true,
            },
          },
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
              study_groups: true,
            },
          },
        },
      });

      presence.subjects_schedules.start_time = new moment(
        presence.subjects_schedules.start_time
      ).format("HH:mm");
      presence.subjects_schedules.finish_time = new moment(
        presence.subjects_schedules.finish_time
      ).format("HH:mm");
      presence.presence_date = new moment(presence.presence_date).format(
        "dddd, D MMMM yyy HH:mm"
      );

      res
        .status(201)
        .json({ message: "Kelas Berhasil Dibuka!", data: presence });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  closePresence: async (req, res) => {
    try {
      const { presence_id } = req.body;

      const presence = await prisma.presences.findFirst({
        where: {
          AND: {
            presence_id: Number(presence_id),
            is_open: true,
            close_time: null,
          },
        },
      });
      if (!presence) {
        res.status(404).json({ message: "Data Not Found!" });
        return;
      }

      const presence_update = await prisma.presences.update({
        where: {
          presence_id: Number(presence.presence_id),
        },
        data: {
          is_open: false,
          close_time: new moment().format(),
        },
      });

      await prisma.presences_details.updateMany({
        where: {
          presence_id: Number(presence.presence_id),
        },
        data: {
          is_inclass: false,
        },
      });

      presence_update.open_time = new moment(presence_update.open_time).format(
        "HH:mm"
      );
      presence_update.close_time = new moment(
        presence_update.close_time
      ).format("HH:mm");
      presence_update.presence_date = new moment(
        presence_update.presence_date
      ).format("dddd, D MMMM yyy HH:mm");

      res
        .status(201)
        .json({ message: "Kelas Ditutup!", data: presence_update });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getActivePresence: async (req, res) => {
    try {
      let { user_id, role_id } = req.user;
      role_id = Number(role_id);
      let response = null;

      if (role_id === 1) {
        const presence_detail_data = await prisma.presences_details.findFirst({
          orderBy: {
            created_at: "desc",
          },
          where: {
            AND: {
              user_id,
              is_inclass: true,
              presences: {
                is_open: true,
              },
            },
          },
          include: {
            presences: true,
          },
        });
        if (!presence_detail_data) {
          res.status(404).json({ message: "Data Not Found!" });
          return;
        }

        response = await prisma.presences.findFirst({
          orderBy: {
            created_at: "desc",
          },
          where: {
            AND: {
              presence_id: presence_detail_data.presence_id,
              close_time: null,
            },
          },
          include: {
            subjects_schedules: {
              select: {
                start_time: true,
                finish_time: true,
                subjects: {
                  select: {
                    name: true,
                  },
                },
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
              },
            },
          },
        });
      } else if (role_id === 2)
        response = await prisma.presences.findFirst({
          orderBy: {
            created_at: "desc",
          },
          where: {
            AND: {
              user_id,
              close_time: null,
            },
          },
          include: {
            subjects_schedules: {
              select: {
                start_time: true,
                finish_time: true,
                subjects: {
                  select: {
                    name: true,
                  },
                },
                study_groups: {
                  select: {
                    name: true,
                  },
                },
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
              },
            },
          },
        });
      if (!response) {
        res.status(404).json({ message: "Data Not Found!", data: response });
        return;
      }

      response.open_time = new moment(response.open_time).format("HH:mm");
      response.presence_date = new moment(response.presence_date).format(
        "dddd, D MMMM yyy HH:mm"
      );
      response.subjects_schedules.start_time = new moment(
        response.subjects_schedules.start_time
      ).format("HH:mm");
      response.subjects_schedules.finish_time = new moment(
        response.subjects_schedules.finish_time
      ).format("HH:mm");

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  toggleWaitingRoom: async (req, res) => {
    try {
      const { presence_id, enable_waiting_room } = req.body;

      const response = await prisma.presences.update({
        where: {
          presence_id: Number(presence_id),
        },
        data: {
          waiting_room: enable_waiting_room,
        },
      });

      res.status(200).json({ message: "Data Updated!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getPresenceHistory: async (req, res) => {
    try {
      const { user_id, role_id } = req.user;
      let response = null;

      if (role_id == 1) {
        response = await prisma.presences_details.findMany({
          orderBy: {
            created_at: "desc",
          },
          where: {
            user_id,
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
                  include: {
                    subjects: {},
                    study_groups: {},
                  },
                },
              },
            },
          },
        });

        response.forEach((item) => {
          item.presences.open_time = new moment(
            item.presences.open_time
          ).format("HH:mm");
          if (item.presences.close_time !== null)
            item.presences.close_time = new moment(
              item.presences.close_time
            ).format("HH:mm");
          item.presences.subjects_schedules.start_time = new moment(
            item.presences.subjects_schedules.start_time
          ).format("HH:mm");
          item.presences.subjects_schedules.finish_time = new moment(
            item.presences.subjects_schedules.finish_time
          ).format("HH:mm");
          item.presence_date = new moment(item.presence_date)
            .startOf("date")
            .format("yyyy-MM-DD");
          item.presences.presence_date = new moment(item.presence_date);

          // Remove Unused Data
          delete item.created_at;
          delete item.updated_at;
          delete item.presences.created_at;
          delete item.presences.updated_at;
          delete item.presences.user_id;
          delete item.presences.room_id;
          delete item.presences.subject_schedule_id;
          delete item.presences.subjects_schedules.created_at;
          delete item.presences.subjects_schedules.updated_at;
          delete item.presences.subjects_schedules.subjects.created_at;
          delete item.presences.subjects_schedules.subjects.updated_at;
          delete item.presences.subjects_schedules.study_groups.created_at;
          delete item.presences.subjects_schedules.study_groups.updated_at;
          delete item.presences.subjects_schedules.subject_id;
          delete item.presences.subjects_schedules.user_id;
          delete item.presences.subjects_schedules.study_group_id;
          delete item.presences.subjects_schedules.room_id;
          delete item.presences.subjects_schedules.day_id;
          delete item.presences.presence_date;
        });
      } else {
        response = await prisma.presences.findMany({
          orderBy: {
            created_at: "desc",
          },
          where: { user_id },
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
                subjects: {},
                study_groups: {},
              },
            },
          },
        });

        response.forEach((item) => {
          if (item.close_time !== null)
            item.close_time = new moment(item.close_time).format("HH:mm");
          item.subjects_schedules.start_time = new moment(
            item.subjects_schedules.start_time
          ).format("HH:mm");
          item.subjects_schedules.finish_time = new moment(
            item.subjects_schedules.finish_time
          ).format("HH:mm");
          item.presence_date = new moment(item.presence_date)
            .startOf("date")
            .format("yyyy-MM-DD");

          // Remove Unused Data
          delete item.created_at;
          delete item.updated_at;
          delete item.subjects_schedules.created_at;
          delete item.subjects_schedules.updated_at;
          delete item.subjects_schedules.subjects.created_at;
          delete item.subjects_schedules.subjects.updated_at;
          delete item.subjects_schedules.study_groups.created_at;
          delete item.subjects_schedules.study_groups.updated_at;
        });
      }
      if (!response)
        return res
          .status(200)
          .json({ message: "Tidak ada riwayat presensi", data: [] });

      // Groupping Data by Date
      const grouppedPresence = response.reduce((prev, current) => {
        (prev[current.presence_date] = prev[current.presence_date] || []).push(
          current
        );
        return prev;
      }, {});

      res
        .status(200)
        .json({ message: "Data Retrieved!", data: grouppedPresence });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
