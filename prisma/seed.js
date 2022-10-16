const { PrismaClient } = require("@prisma/client");
const studyGroupSeed = require("./studyGroupSeed");
const roleSeed = require("./roleSeed");
const userSeed = require("./userSeed");
const beaconSeed = require("./beaconSeed");
const daySeed = require("./daySeed");
const roomSeed = require("./roomSeed");
const subjectSeed = require("./subjectSeed");
const subjectScheduleSeed = require("./subjectScheduleSeed");
const presenceStatusSeed = require("./presenceStatusSeed");

const prisma = new PrismaClient();

async function main() {
  await roleSeed();
  await studyGroupSeed();
  await beaconSeed();
  await daySeed();
  await userSeed();
  await roomSeed();
  await subjectSeed();
  await subjectScheduleSeed();
  await presenceStatusSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
