const mongoose = require("mongoose")

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    name: String,
    phone: Number,
    cab_id: { type: Schema.Types.ObjectId, ref: 'Cabs' }
}, { timestamps: true })

const Booking = mongoose.model("Bookings", bookingSchema)

module.exports = Booking

