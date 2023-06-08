const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const Doctor = require("../models/doctorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticationMiddleware = ("../middlewares/authenticationMiddleware")

router.post("/registration", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(200).send({ message: "User already exist", success: false })
        }
        const password = req.body.password
        // const confirmPassword = req.body.confirmPassword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // const hashedPasswordConfirm = await bcrypt.h ash(confirmPassword, salt)
        req.body.password = hashedPassword
        // req.body.confirmPassword = hashedPasswordConfirm
        const newuser = new User(req.body)
        await newuser.save()
        res.status(200).send({ message: "User created successfully", success: true })
    } catch (error) {
        res.status(500).send({ message: "Error creating user", success: false, error })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: "Password is incorrect", success: false })
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d", })
            res.status(200).send({ message: "Login successful", success: true, data: token })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error sign in", success: false, error })
    }
})

router.post("/get-user-info-by-id", authenticationMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        user.password = undefined
        if (!user) {
            return res.status(200).send({ message: "User doen not found", success: false })
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error getting user info", success: false, error })
    }
})

router.post("/doctor-account", authenticationMiddleware, async (req, res) => {
    try {
        const newdoctor = new Doctor({ ...req.body, status: "pending" })
        await newdoctor.save()
        const adminUser = await User.findOne({ isAdmin: true })

        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: "new-doctor-request",
            message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newdoctor._id,
                name: newdoctor.firstName + " " + newdoctor.lastName
            },
            onClickPath: "/admin/doctors"
        })
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications })
        res.status(200).send({ message: "Doctor account created successfully", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error applyng doctor account", success: false, error })
    }
})

router.post("/mark-notifications-as-seen", authenticationMiddleware, async (req, res) => {
    try {
        const { user } = await User.findOne({ _id: req.body.userId })
        const unseenNotifications = user.unseenNotifications
        const seenNotifications = user.seenNotifications
        seenNotifications.push(...unseenNotifications)
        user.seenNotifications = unseenNotifications
        user.unseenNotifications = []
        user.seenNotifications = seenNotifications 
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({ message: "All notifications marked as seen", success: true, data: updatedUser })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error applyng doctor account", success: false, error })
    }
})

router.post("/delete-notifications", authenticationMiddleware, async (req, res) => {
    try {
        const { user } = await User.findOne({ _id: req.body.userId })
        user.seenNotifications = []
        user.unseenNotifications = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({ message: "All notifications deleted", success: true, data: updatedUser })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error applyng doctor account", success: false, error })
    }
})


module.exports = router