import express from 'express'
import { postAppointment,getAllAppointments,updateAppointmentStatus,deleteAppointment } from '../controller/appointmentController.js'
import {isPatientAuthenticated,isAdminAuthenticated} from '../middlewares/auth.js'

const router=express.Router()
router.post('/post',isPatientAuthenticated,postAppointment)
router.get('/getAllAppointments',isAdminAuthenticated,getAllAppointments)
router.put('/update_appointment/:id',isAdminAuthenticated,updateAppointmentStatus)
router.delete('/delete_appointment/:id',deleteAppointment)
export default router;