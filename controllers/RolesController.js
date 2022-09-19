const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = {
    getRoles: async function(req, res){
        try {
            const response = await prisma.roles.findMany();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },

    getRolesById: async function (req, res){
        try {
            const response = await prisma.roles.findUnique({
                where:{
                    role_id : Number(req.params.id),
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({msg: error.message});
        }
    },

    createRoles: async function(req, res){
        const {role} = req.body;
        console.log(req.body)
        try {
            const roles = await prisma.roles.create({
                data:{
                    role : role,
                }
            });
            res.status(201).json(roles);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    updateRoles: async function(req, res){
        const {role} = req.body;
        try {
            const roles = await prisma.roles.update({
                where:{
                    role_id: Number(req.params.id),
                },
                data:{
                    role : role
                }
            });
            res.status(201).json(roles);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    deleteRoles: async function(req, res){
        try {
            const roles = await prisma.roles.delete({
                where:{
                    role_id: Number(req.params.id)
                }
            });
            res.status(201).json(roles);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    }
}

