const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cabSchema = new Schema({
    from: String,
    destination: String,
    status: String,
    rating: Number
}, { timestamps: true })

const cab = mongoose.model("Cabs", cabSchema)

module.exports = cab