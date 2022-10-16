const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const presenceStatusData = [
  {
    status: "Hadir",
  },
  {
    status: "Izin",
  },
  {
    status: "Absen",
  },
];

async function main() {
  console.log(`Start seeding status ...`);
  for (const s of presenceStatusData) {
    const status = await prisma.presences_statuses.create({
      data: s,
    });
    console.log(`Created status id: ${status.presence_status_id}`);
  }
  console.log("Seeding status finished");
}

module.exports = main;
