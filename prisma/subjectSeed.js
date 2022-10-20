const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const subjectData = [
  {
    name: "Pengembangan Perangkat Lunak Berbasis Agile",
    acronym: "PPL",
  },
  {
    name: "Praktikum Pengembangan Perangkat Lunak Berbasis Agile",
    acronym: "PPPL",
  },
  {
    name: "Pengujian dan Penjaminan Kualitas Perangkat Lunak",
    acronym: "SQA",
  },
  {
    name: "Workshop Aplikasi dan Komputasi Awan",
    acronym: "WCC",
  },
  {
    name: "Workshop Rekayasa Ulang Kode",
    acronym: "WRUK",
  },
  {
    name: "Workshop Administrasi Basis Data",
    acronym: "WABD",
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
