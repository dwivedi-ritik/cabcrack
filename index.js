const mongoose = require('mongoose')
const app = require("express")()
const bodyparser = require("body-parser")

const booking_api = require("./booking_api")
const cab_api = require("./cab_api.js")

app.use(bodyparser.json())

app.use("/", cab_api)
app.use("/booking", booking_api)


const URI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000"


app.listen(8000, () => {
    mongoose.connect(URI).then(out => {
        console.log("App is up and running")
    })

})