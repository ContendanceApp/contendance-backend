const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const roleData = [
  {
    role: "Mahasiswa",
  },
  {
    role: "Dosen",
  },
  {
    role: "Admin",
  },
  {
    role: "Tester",
  },
];

async function main() {
  console.log(`Start seeding role ...`);
  for (const r of roleData) {
    const role = await prisma.roles.create({
      data: r,
    });
    console.log(`Created role id: ${role.role_id}`);
  }
  console.log("Seeding role finished");
}

module.exports = main;
