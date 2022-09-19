const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = {
    getSchedules: async function(req, res){
        try {
            const response = await prisma.subjects_schedules.findMany();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },

    getSchedulesById: async function (req, res){
        try {
            const response = await prisma.subjects_schedules.findUnique({
                where:{
                    subject_schedule_id: Number(req.params.id),
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({msg: error.message});
        }
    },

    createSchedules: async function(req, res){
        const {subject_id, user_id, study_group_id, room_id, start_time, finish_time} = req.body;
        console.log(req.body)
        try {
            const subjects_schedules = await prisma.subjects_schedules.create({
                data:{
                    subject_id : subject_id,
                    user_id : user_id,
                    study_group_id : study_group_id,
                    room_id : room_id,
                    start_time : start_time,
                    finish_time : finish_time
                }
            });
            res.status(201).json(subjects_schedules);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    updateSchedules: async function(req, res){
        const {subject_id, user_id, study_group_id, room_id, start_time, finish_time} = req.body;
        try {
            const subjects_schedules = await prisma.subjects_schedules.update({
                where:{
                    subject_schedule_id: Number(req.params.id),
                },
                data:{
                    subject_id : subject_id,
                    user_id : user_id,
                    study_group_id : study_group_id,
                    room_id : room_id,
                    start_time : start_time,
                    finish_time : finish_time
                }
            });
            res.status(201).json(subjects_schedules);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    },

    deleteSchedules: async function(req, res){
        try {
            const subjects_schedules = await prisma.subjects_schedules.delete({
                where:{
                    subject_schedule_id: Number(req.params.id)
                }
            });
            res.status(201).json(subjects_schedules);
        }catch (error) {
            res.status(400).json({msg:error.message});
        }
    }
}