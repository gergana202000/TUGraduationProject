const express = require("express")
const router = express.Router
const Doctor = require("../models/doctorModel")
const User = require("../models/userModel")
const authenticationMiddleware = require("../middlewares/authenticationMiddleware")
const Appointment = require("../models/appointmentModel")

router.post("/get-doctor-info-by-user-id", authenticationMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId })
        res.status(200).send({ message: "Doctor info fetched successfully", success: true, data: doctor })
    } catch (error) {
        res.status(500).send({ message: "Error getting doctor info", success: false, error })
    }
})

router.post("/update-doctor-profile", authenticationMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate(
            {_id: req.body.doctorId})
        res.status(200).send({ message: "Doctor profile updated successfully", success: true, data: doctor })
    } catch (error) {
        res.status(500).send({ message: "Error getting doctor info", success: false, error })
    }
})

router.post("/get-doctor-info-by-doctor-id", authenticationMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId })
        res.status(200).send({ message: "Doctor info fetched successfully", success: true, data: doctor })
    } catch (error) {
        res.status(500).send({ message: "Error getting doctor info", success: false, error })
    }
})

router.get("/get-appointments-by-doctor-id", authenticationMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userID: req.body.userId})
        const appointments = await Appointment.find({doctorId: doctor._id});
        res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments, })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching appointments", success: false, error, });
    }
});

router.post("/change-appointent-status", authenticationMiddleware, async (req, res) => {
    try {
        const { appointmentId, status, } = req.body
        const appointent = await Appointment.findByIdAndUpdate(appointmentId, {
            status,
        })
        const user = await User.findOne({ _id: appointent. userId})
        const unseenNotifications = user.unseenNotifications
        unseenNotifications.push({
            type: "appointmesnt-status-changed",
            message: `Your appointment status has been ${status}`,
            onClickPath: "/appointments"
        })
        await user.save()

        const doctors = await Doctor.find({})

        res.status(200).send({ message: "Appointment status updated successfully", success: true,})
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error changing appointment status", success: false, error, });
    }
});

module.exports = router