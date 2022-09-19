const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = {
    getPresences: async function(req, res){
        try {
            const response = await prisma.presences.findMany();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    
    getPresencesById: async function(req, res){
        try {
            const response = await prisma.presences.findUnique({
                where:{
                    presence_id: Number(req.params.id),
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({msg: error.message});
        }
    }
    ,
    
    updatePresences: async function(req, res){
        const {subject_schedule_id,room_id,user_id,is_open,open_time,close_time,presence_date} = req.body;
        try {
            const presences = await prisma.presences.update({
                where:{
                    presence_id: Number(req.params.id),
                },
                data:{
                    subject_schedule_id : subject_schedule_id,
                    room_id : room_id,
                    user_id : user_id,   
                    is_open : is_open,
                    open_time : open_time,
                    close_time : close_time,
                    presence_date : presence_date
    
                }
            });
            res.status(201).json(presences);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },
    
    deletePresences: async function (req, res){
        const {subject_schedule_id,room_id,user_id,is_open,open_time,close_time,presence_date } = req.body;
        try {
            const presences = await prisma.presences.delete({
                where:{
                    presence_id: Number(req.params.id),
                }
            });
            res.status(201).json(presences);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    }
}

// export const getPresences = async(req, res) =>{
//     try {
//         const response = await prisma.presences.findMany();
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const getPresencesById = async(req, res) =>{
//     try {
//         const response = await prisma.presences.findUnique({
//             where:{
//                 id: Number(req.params.id)
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(404).json({msg: error.message});
//     }
// }


// export const updatePresences = async (req, res) =>{
//     const {subject_schedule_id,room_id,user_id,is_open,open_time,close_time,presence_date} = req.body;
//     try {
//         const presences = await prisma.presences.update({
//             where:{
//                 id: Number(req.params.id)
//             },
//             data:{
//                 subject_schedule_id,
//                 room_id,
//                 user_id,   
//                 is_open,
//                 open_time,
//                 close_time,
//                 presence_date 

//             }
//         });
//         res.status(201).json(presences);
//     }catch (error) {
//         res.status(400).json({msg:error.message});
//     }
// }

// export const deletePresences = async (req, res) =>{
//     const {subject_schedule_id,room_id,user_id,is_open,open_time,close_time,presence_date } = req.body;
//     try {
//         const presences = await prisma.presences.delete({
//             where:{
//                 id: Number(req.params.id)
//             }
//         });
//         res.status(201).json(presences);
//     }catch (error) {
//         res.status(400).json({msg:error.message});
//     }
// }
