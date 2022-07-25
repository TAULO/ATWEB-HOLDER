const express = require("express")
const app = express()
const mandrill = require('node-mandrill')('<Your Api Key Here>');


const port = 4000

app.listen(() => {
    console.log("Running server on ", port)
})