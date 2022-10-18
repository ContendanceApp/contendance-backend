const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
moment.locale("id");

const prisma = new PrismaClient();

module.exports = {
  getPresences: async (req, res) => {
    try {
      const response = await prisma.presences.findMany();
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
      const presences = await prisma.presences.update({
        where: {
          presence_id: Number(req.params.id),
        },
        data: {
          subject_schedule_id: Number(subject_schedule_id),
          room_id: Number(room_id),
          user_id: Number(user_id),
          is_open: Number(is_open),
          open_time: Number(open_time),
          close_time: Number(close_time),
          presence_date: Number(presence_date),
        },
      });
      res.status(201).json(presences);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deletePresence: async (req, res) => {
    try {
      const presences = await prisma.presences.delete({
        where: {
          presence_id: Number(req.params.id),
        },
      });
      res.status(201).json(presences);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  findClasses: async (req, res) => {
    try {
      const { proximity } = req.body;
      const user_id = req.user.user_id;
      const dayNow = moment().format("dddd");

      const beacon = await prisma.beacons.findFirst({
        where: { proximity_uuid: proximity },
      });
      if (!beacon) {
        res.status(404).json({ message: "Beacon Not Found!" });
        return;
      }

      const room = await prisma.rooms.findFirst({
        where: { beacon_id: beacon.beacon_id },
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
          subjects: { select: { name: true } },
          users: { select: { fullname: true } },
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

      const presence = await prisma.presences.create({
        data: {
          subject_schedule_id: Number(subject_schedule_id),
          room_id: Number(room_id),
          user_id: Number(user_id),
          is_open: true,
          waiting_room: false,
          open_time: new moment().format(),
          close_time: null,
          presence_date: new moment().format(),
        },
      });
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
            presence_id,
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

      res
        .status(201)
        .json({ message: "Kelas Ditutup!", data: presence_update });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getActivePresence: async (req, res) => {
    try {
      const user_id = req.user.user_id;
      const result = await prisma.presences_details.findFirst({
        orderBy: {
          created_at: "desc",
        },
        where: {
          AND: {
            user_id,
            is_inclass: true,
          },
        },
      });
      if (!result) {
        res.status(404).json({ message: "Data Not Found!", data: result });
        return;
      }

      res.status(200).json({ message: "Data Retrieved!", data: result });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  toggleWaitingRoom: async (req, res) => {
    try {
      const { presence_id, enable_waiting_room } = req.body;

      const response = await prisma.presences.update({
        where: {
          presence_id,
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
};
