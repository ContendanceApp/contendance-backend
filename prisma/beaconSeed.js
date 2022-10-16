const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const beaconData = [
  {
    proximity_uuid: "fda50693-a4e2-4fb1-afcf-c6eb07647825",
    major: 1,
    minor: 2,
  },
];

async function main() {
  console.log(`Start seeding beacon ...`);
  for (const b of beaconData) {
    const beacon = await prisma.beacons.create({
      data: b,
    });
    console.log(`Created beacon id: ${beacon.beacon_id}`);
  }
  console.log("Seeding beacon finished");
}

module.exports = main;
