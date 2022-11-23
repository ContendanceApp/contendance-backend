const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const subjectData = [
  // Subject ID: 1
  {
    name: "Pengembangan Perangkat Lunak Berbasis Agile",
    acronym: "PPL",
  },
  // Subject ID: 2
  {
    name: "Praktikum Pengembangan Perangkat Lunak Berbasis Agile",
    acronym: "PPPL",
  },
  // Subject ID: 3
  {
    name: "Pengujian dan Penjaminan Kualitas Perangkat Lunak",
    acronym: "SQA",
  },
  // Subject ID: 4
  {
    name: "Workshop Aplikasi dan Komputasi Awan",
    acronym: "WCC",
  },
  // Subject ID: 5
  {
    name: "Workshop Rekayasa Ulang Kode",
    acronym: "WRUK",
  },
  // Subject ID: 6
  {
    name: "Workshop Administrasi Basis Data",
    acronym: "WABD",
  },
  // Subject ID: 7
  {
    name: "Sprint Review WPPL",
    acronym: "SRW",
  },
  // Subject ID: 8
  {
    name: "Praktikum Kecerdasan Buatan",
    acronym: "PKB",
  },
  // Subject ID: 9
  {
    name: "Kecerdasan Buatan",
    acronym: "KB",
  },
  // Subject ID: 10
  {
    name: "Workshop Data Mining",
    acronym: "WDM",
  },
  // Subject ID: 11
  {
    name: "Bahasa Inggris Teknik",
    acronym: "BIT",
  },
  // Subject ID: 12
  {
    name: "Bahasa Indonesia",
    acronym: "BI",
  },
  // Subject ID: 13
  {
    name: "PENSASI",
    acronym: "PSI",
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
