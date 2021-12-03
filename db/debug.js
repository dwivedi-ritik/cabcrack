// New Entry into the bookingSchema
// const cab1 = new cab({
//     from: "Mirzapur",
//     destination: "Chunar",
//     status: "Booked",
//     rating: "3"
// })
// let entry1 = new Booking({
//     name: "Amit",
//     phone: 991245000
// })

// cab1.save((err, entry) => {
//     console.log(entry)
// })

// entry1.cab_id = cab1

// entry1.save((err, entry) => {
//     console.log(entry)
// })


// const get = async () => {
//     const entries = await Booking.find({ name: "Amit" })
//     entries.forEach(async (el) => {
//         const val = await el.populate("cab_id")
//         console.log(val)
//     })
// }
// get()