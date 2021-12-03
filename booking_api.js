const express = require("express")
const app = express()
const body_parser = require("body-parser")
const Booking = require("./db/bookings/bookings")
const Cab = require("./db/cabs/cab")

app.use(body_parser)

const router = express.Router()

router.get("/", async (req, res) => {
    const bookings_list = await Booking.find().populate('cab_id')
    res.send(bookings_list)

})


module.exports = router