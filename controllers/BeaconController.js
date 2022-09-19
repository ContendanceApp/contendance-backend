const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = {
    getBeacons: async function(req, res){
        try {
            const response = await prisma.beacons.findMany();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },

    getBeaconsById: async function (req, res){
        try {
            const response = await prisma.beacons.findUnique({
                where:{
                    beacon_id: Number(req.params.id),
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({msg: error.message});
        }
    },

    createBeacons: async function(req, res){
        const {major, minor, proximity_uuid} = req.body;
        console.log(req.body)
        try {
            const beacons = await prisma.beacons.create({
                data:{
                    major: major,
                    minor: minor,
                    proximity_uuid: proximity_uuid,
                }
            });
            res.status(201).json(beacons);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    updateBeacons: async function(req, res){
        const {major, minor, proximity_uuid} = req.body;
        try {
            const beacons = await prisma.beacons.update({
                where:{
                    beacon_id: Number(req.params.id),
                },
                data:{
                    major: major,
                    minor: minor,
                    proximity_uuid: proximity_uuid,
                }
            });
            res.status(201).json(beacons);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    deleteBeacons: async function(req, res){
        try {
            const beacons = await prisma.beacons.delete({
                where:{
                    beacon_id: Number(req.params.id)
                }
            });
            res.status(201).json(beacons);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    }
}

// export const getBeacons = async(req, res) =>{
//     try {
//         const response = await prisma.beacons.findMany();
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const getBeaconById = async(req, res) =>{
//     try {
//         const response = await prisma.beacons.findUnique({
//             where:{
//                 id: Number(req.params.id)
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(404).json({msg: error.message});
//     }
// }

// export const createBeacon = async (req, res) =>{
//     const {major, minor, proximity_uuid} = req.body;
//     try {
//         const beacons = await prisma.beacons.create({
//             data:{
//                 major: major,
//                 minor: minor,
//                 proximity_uuid: proximity_uuid,
//             }
//         });
//         res.status(201).json(beacons);
//     }catch (error) {
//         res.status(400).json({msg:error.message});
//     }
// }

// export const updateBeacon = async (req, res) =>{
//     const {major, minor, proximity_uuid} = req.body;
//     try {
//         const beacons = await prisma.beacons.update({
//             where:{
//                 beacon_id: Number(req.params.id),
//             },
//             data:{
//                 major: major,
//                 minor: minor,
//                 proximity_uuid: proximity_uuid,
//             }
//         });
//         res.status(201).json(beacons);
//     }catch (error) {
//         res.status(400).json({msg:error.message});
//     }
// }

// export const deleteBeacon = async (req, res) =>{
//     try {
//         const beacons = await prisma.beacons.delete({
//             where:{
//                 beacon_id: Number(req.params.id)
//             }
//         });
//         res.status(201).json(beacons);
//     }catch (error) {
//         res.status(400).json({msg:error.message});
//     }
// }
