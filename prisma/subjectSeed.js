const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const subjectData = [
  {
    name: "Pengembangan Perangkat Lunak Berbasis Agile",
  },
  {
    name: "Praktikum Pengembangan Perangkat Lunak Berbasis Agile",
  },
  {
    name: "Pengujian dan Penjaminan Kualitas Perangkat Lunak",
  },
];

async function main() {
  console.log(`Start seeding subject ...`);
  for (const r of subjectData) {
    const subject = await prisma.subjects.create({
      data: r,
    });
    console.log(`Created subject id: ${subject.subject_id}`);
  }
  console.log("Seeding subject finished");
}

module.exports = main;
