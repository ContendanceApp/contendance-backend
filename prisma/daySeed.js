const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dayData = [
  {
    day: "Senin",
  },
  {
    day: "Selasa",
  },
  {
    day: "Rabu",
  },
  {
    day: "Kamis",
  },
  {
    day: "Jumat",
  },
  {
    day: "Sabtu",
  },
  {
    day: "Minggu",
  },
];

async function main() {
  console.log(`Start seeding day ...`);
  for (const r of dayData) {
    const day = await prisma.days.create({
      data: r,
    });
    console.log(`Created day id: ${day.day_id}`);
  }
  console.log("Seeding day finished");
}

module.exports = main;
