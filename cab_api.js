const express = require("express")
const app = express()

const Joi = require("joi")
const Cab = require("./db/cabs/cab")

const router = express.Router()

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

router.get("/cab", async (req, res) => {
    const allEntry = await Cab.find()

    let Cab_entries = []

    allEntry.forEach(dbs => {
        Cab_entries.push(dbs)
    })
    res.send(Cab_entries)
})

//Route for post request to the database
router.post("/cab", async (req, res) => {
    try {
        const cab_validation = await cabSchema.validateAsync(req.body)
        const add_data = new Cab(cab_validation)
        const resp = await add_data.save()
        res.send(resp)
    } catch (err) {
        res.sendStatus(400)
    }
})

router.get("/getCab", async (req, res) => {
    try {
        const q = await query_schema.validateAsync(req.query)
        const cabs = await Cab.find(q)
        res.send(cabs)
    } catch (err) {
        res.sendStatus(400)
    }
})

router.delete("/cab", async (req, res) => {
    try {
        const query = await query_schema.validateAsync(req.body)
        const db_respo = await Cab.deleteOne(query)
        res.send(db_respo)

    } catch (err) {
        console.log(err.message)
        res.sendStatus(400)
    }

})

module.exports = router

