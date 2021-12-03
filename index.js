const mongoose = require('mongoose')
const app = require("express")()
const bodyparser = require("body-parser")
const Joi = require("joi")
const Cab = require("./db/cabs/cab")

const booking_api = require("./booking_api")

app.use("/booking", booking_api)


const URI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000"

app.use(bodyparser.json())

const cabSchema = Joi.object({
    from: Joi.string().min(3).max(50).required(),
    destination: Joi.string().min(3).max(50).required(),
    status: Joi.string().required(),
    rating: Joi.number()
})

const query_schema = Joi.object({
    from: Joi.string(),
    _id: Joi.string().alphanum(),
    destination: Joi.string(),
    rating: Joi.number().min(0).max(5)
})


/* I have to make some endpoints with data validation*/

app.get("/cab", async (req, res) => {
    const allEntry = await Cab.find()

    let Cab_entries = []

    allEntry.forEach(dbs => {
        Cab_entries.push(dbs)
    })
    res.send(Cab_entries)
})

//Route for post request to the database
app.post("/cab", async (req, res) => {
    try {
        const cab_validation = await cabSchema.validateAsync(req.body)
        const add_data = new Cab(cab_validation)
        const resp = await add_data.save()
        res.send(resp)
    } catch (err) {

        res.sendStatus(400)

    }
})

app.get("/getCab", async (req, res) => {
    try {
        const q = await query_schema.validateAsync(req.query)
        const cabs = await Cab.find(q)
        res.send(cabs)
    } catch (err) {
        res.sendStatus(400)
    }
})

app.delete("/cab", async (req, res) => {
    try {
        const query = await query_schema.validateAsync(req.body)
        const db_respo = await Cab.deleteOne(query)

        res.send(db_respo)


    } catch (err) {
        console.log(err.message)
        res.sendStatus(400)
    }

})

app.listen(8000, () => {
    mongoose.connect(URI).then(out => {
        console.log("App is up and running")
    })

})