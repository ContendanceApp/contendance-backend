const { PrismaClient } = require("@prisma/client");
const moment = require("moment");

const prisma = new PrismaClient();

const subjectScheduleData = [
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
  {
    subject_id: 4,
    user_id: 31,
    study_group_id: 1,
    room_id: 1,
    day_id: 3,
    start_time: new moment("13:00", "HH:mm").format(),
    finish_time: new moment("16:20", "HH:mm").format(),
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
