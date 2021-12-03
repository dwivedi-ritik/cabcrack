const express = require("express")
const Joi = require("joi")

const Booking = require("./db/bookings/bookings")
const Cab = require("./db/cabs/cab")

const router = express.Router()

const bookingReq = Joi.object({
    name: Joi.string().min(5).required(),
    phone: Joi.number().required(),
    cab_key: Joi.string().alphanum().required()

})
router.get("/", async (req, res) => {
    const bookings_list = await Booking.find().populate('cab_id')
    res.send(bookings_list)
})

router.post("/", async (req, res) => {
    try {
        const validate_body = await bookingReq.validateAsync(req.body)
        const cab_entry = await Cab.findOne({ _id: validate_body.cab_key })

        const new_booking = new Booking({
            name: validate_body.name,
            phone: validate_body.phone
        })
        new_booking.cab_id = cab_entry
        cab_entry.status = "Booked"
        const cab_response = await cab_entry.save()
        const new_booking_response = await new_booking.save()

        res.send(new_booking_response)

    } catch (err) {
        console.log(err.message)
        res.sendStatus(404)
    }
})

module.exports = router