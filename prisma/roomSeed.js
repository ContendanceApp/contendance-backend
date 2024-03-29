const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const roomData = [
  {
    beacon_id: 1,
    name: "Gedung PASCA PENS",
    room_code: "PASCAPENS",
    location: "Lantai 1 - Gedung PASCA PENS",
    description: "Digunakan untuk banyak kegiatan kampus",
  },
  {
    beacon_id: 1,
    name: "Lab. Database",
    room_code: "C-103",
    location: "Lantai 1 - Gedung D4",
    description: "Digunakan untuk praktikum mata kuliah database",
  },
  {
    beacon_id: 1,
    name: "Ruang Kelas",
    room_code: "B-305",
    location: "Lantai 3 - Gedung D4",
    description: "Digunakan untuk kegiatan belajar mengajar",
  },
  {
    beacon_id: 1,
    name: "Gedung PASCA PENS",
    room_code: "PASCAPENS",
    location: "Lantai 1 - Gedung PASCA PENS",
    description: "Digunakan untuk banyak kegiatan kampus",
  },
];

async function main() {
  console.log(`Start seeding room ...`);
  for (const r of roomData) {
    const room = await prisma.rooms.create({
      data: r,
    });
    console.log(`Created room id: ${room.room_id}`);
  }
  console.log("Seeding room finished");
}

module.exports = main;
