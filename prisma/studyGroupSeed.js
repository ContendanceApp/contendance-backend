const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const studyGroupData = [
  {
    name: "3 D4 IT A",
    year: 2020,
  },
  {
    name: "3 D4 IT B",
    year: 2020,
  },
  {
    name: "PENSASI",
    year: 2022,
  },
];

async function main() {
  console.log(`Start seeding study group ...`);
  for (const sg of studyGroupData) {
    const studyGroup = await prisma.study_groups.create({
      data: sg,
    });
    console.log(`Created study group id: ${studyGroup.study_group_id}`);
  }
  console.log("Seeding study group finished");
}

module.exports = main;
