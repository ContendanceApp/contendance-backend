const { PrismaClient } = require("@prisma/client");
const moment = require("moment");

const prisma = new PrismaClient();

const subjectScheduleData = [
  // Kelas A
  // Senin
  {
    subject_id: 8,
    user_id: 34,
    study_group_id: 1,
    room_id: 1,
    day_id: 1,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("10:30", "HH:mm").format(),
  },
  {
    subject_id: 9,
    user_id: 34,
    study_group_id: 1,
    room_id: 1,
    day_id: 1,
    start_time: new moment("10:30", "HH:mm").format(),
    finish_time: new moment("12:00", "HH:mm").format(),
  },
  {
    subject_id: 7,
    user_id: 28,
    study_group_id: 1,
    room_id: 1,
    day_id: 1,
    start_time: new moment("13:00", "HH:mm").format(),
    finish_time: new moment("17:00", "HH:mm").format(),
  },
  {
    subject_id: 1,
    user_id: 28,
    study_group_id: 1,
    room_id: 1,
    day_id: 1,
    start_time: new moment("13:00", "HH:mm").format(),
    finish_time: new moment("14:40", "HH:mm").format(),
  },
  {
    subject_id: 2,
    user_id: 29,
    study_group_id: 1,
    room_id: 1,
    day_id: 1,
    start_time: new moment("14:40", "HH:mm").format(),
    finish_time: new moment("17:10", "HH:mm").format(),
  },
  // Selasa
  {
    subject_id: 3,
    user_id: 28,
    study_group_id: 1,
    room_id: 1,
    day_id: 2,
    start_time: new moment("8:00", "HH:mm").format(),
    finish_time: new moment("9:40", "HH:mm").format(),
  },
  {
    subject_id: 10,
    user_id: 36,
    study_group_id: 1,
    room_id: 1,
    day_id: 2,
    start_time: new moment("9:40", "HH:mm").format(),
    finish_time: new moment("13:00", "HH:mm").format(),
  },
  // Rabu
  {
    subject_id: 4,
    user_id: 31,
    study_group_id: 1,
    room_id: 1,
    day_id: 3,
    start_time: new moment("13:00", "HH:mm").format(),
    finish_time: new moment("16:20", "HH:mm").format(),
  },
  // Add on Rabu
  {
    subject_id: 11,
    user_id: 35,
    study_group_id: 1,
    room_id: 1,
    day_id: 3,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("09:40", "HH:mm").format(),
  },
  {
    subject_id: 12,
    user_id: 37,
    study_group_id: 1,
    room_id: 1,
    day_id: 3,
    start_time: new moment("09:40", "HH:mm").format(),
    finish_time: new moment("11:20", "HH:mm").format(),
  },
  {
    subject_id: 14,
    user_id: 63,
    study_group_id: 1,
    room_id: 1,
    day_id: 3,
    start_time: new moment("01:00", "HH:mm").format(),
    finish_time: new moment("23:59", "HH:mm").format(),
  },
  // Kamis
  {
    subject_id: 11,
    user_id: 35,
    study_group_id: 1,
    room_id: 1,
    day_id: 4,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("09:40", "HH:mm").format(),
  },
  {
    subject_id: 12,
    user_id: 37,
    study_group_id: 1,
    room_id: 1,
    day_id: 4,
    start_time: new moment("09:40", "HH:mm").format(),
    finish_time: new moment("11:20", "HH:mm").format(),
  },
  {
    subject_id: 5,
    user_id: 32,
    study_group_id: 1,
    room_id: 1,
    day_id: 4,
    start_time: new moment("16:00", "HH:mm").format(),
    finish_time: new moment("20:00", "HH:mm").format(),
  },
  // Jum'at
  {
    subject_id: 6,
    user_id: 33,
    study_group_id: 1,
    room_id: 1,
    day_id: 5,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("11:20", "HH:mm").format(),
  },

  // Kelas B
  // Senin
  {
    subject_id: 7,
    user_id: 29,
    study_group_id: 2,
    room_id: 1,
    day_id: 1,
    start_time: new moment("13:00", "HH:mm").format(),
    finish_time: new moment("17:00", "HH:mm").format(),
  },
  {
    subject_id: 1,
    user_id: 30,
    study_group_id: 2,
    room_id: 1,
    day_id: 1,
    start_time: new moment("13:00", "HH:mm").format(),
    finish_time: new moment("14:40", "HH:mm").format(),
  },
  {
    subject_id: 2,
    user_id: 30,
    study_group_id: 2,
    room_id: 1,
    day_id: 1,
    start_time: new moment("14:40", "HH:mm").format(),
    finish_time: new moment("17:10", "HH:mm").format(),
  },
  // Selasa
  {
    subject_id: 3,
    user_id: 29,
    study_group_id: 2,
    room_id: 1,
    day_id: 2,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("09:40", "HH:mm").format(),
  },
  {
    subject_id: 10,
    user_id: 36,
    study_group_id: 2,
    room_id: 1,
    day_id: 2,
    start_time: new moment("09:40", "HH:mm").format(),
    finish_time: new moment("13:00", "HH:mm").format(),
  },
  {
    subject_id: 8,
    user_id: 38,
    study_group_id: 2,
    room_id: 1,
    day_id: 2,
    start_time: new moment("15:30", "HH:mm").format(),
    finish_time: new moment("18:00", "HH:mm").format(),
  },
  // Rabu
  {
    subject_id: 4,
    user_id: 31,
    study_group_id: 2,
    room_id: 1,
    day_id: 3,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("11:20", "HH:mm").format(),
  },
  {
    subject_id: 9,
    user_id: 38,
    study_group_id: 2,
    room_id: 1,
    day_id: 3,
    start_time: new moment("12:10", "HH:mm").format(),
    finish_time: new moment("14:00", "HH:mm").format(),
  },
  // Kamis
  {
    subject_id: 11,
    user_id: 35,
    study_group_id: 2,
    room_id: 1,
    day_id: 4,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("09:40", "HH:mm").format(),
  },
  {
    subject_id: 12,
    user_id: 37,
    study_group_id: 2,
    room_id: 1,
    day_id: 4,
    start_time: new moment("09:40", "HH:mm").format(),
    finish_time: new moment("11:20", "HH:mm").format(),
  },
  {
    subject_id: 6,
    user_id: 33,
    study_group_id: 2,
    room_id: 1,
    day_id: 4,
    start_time: new moment("12:10", "HH:mm").format(),
    finish_time: new moment("15:30", "HH:mm").format(),
  },
  {
    subject_id: 5,
    user_id: 32,
    study_group_id: 2,
    room_id: 1,
    day_id: 4,
    start_time: new moment("16:00", "HH:mm").format(),
    finish_time: new moment("20:00", "HH:mm").format(),
  },

  // PENSASI - Selasa
  {
    subject_id: 13,
    user_id: 63,
    study_group_id: 3,
    room_id: 1,
    day_id: 2,
    start_time: new moment("08:00", "HH:mm").format(),
    finish_time: new moment("20:00", "HH:mm").format(),
  },
];

async function main() {
  console.log(`Start seeding subject schedule ...`);
  for (const ss of subjectScheduleData) {
    const subjectSchedule = await prisma.subjects_schedules.create({
      data: ss,
    });
    console.log(
      `Created subject schedule id: ${subjectSchedule.subject_schedule_id}`
    );
  }
  console.log("Seeding subject schedule finished");
}

module.exports = main;
