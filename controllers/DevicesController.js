const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = {
    getDevices: async function(req, res){
        try {
            const response = await prisma.devices.findMany();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },

    getDevicesById: async function (req, res){
        try {
            const response = await prisma.devices.findUnique({
                where:{
                    device_id: Number(req.params.id),
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({msg: error.message});
        }
    },

    createDevices: async function(req, res){
        const {user_id, mac_address} = req.body;
        console.log(req.body)
        try {
            const devices = await prisma.devices.create({
                data:{
                    user_id: user_id,
                    mac_address: mac_address,
                    
                }
            });
            res.status(201).json(devices);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    updateDevices: async function(req, res){
        const {user_id, mac_address} = req.body;
        try {
            const beacons = await prisma.devices.update({
                where:{
                    device_id: Number(req.params.id),
                },
                data:{
                    user_id : user_id,
                    mac_address : mac_address,
                }
            });
            res.status(201).json(devices);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    deleteDevices: async function(req, res){
        try {
            const beacons = await prisma.devices.delete({
                where:{
                    device_id: Number(req.params.id)
                }
            });
            res.status(201).json(devices);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    }
}

