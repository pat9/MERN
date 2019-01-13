const express = require('express');
const router = express.Router();

const TaskSchema = require("../models/task")

router.get("/", (req, res) =>{
    res.json({
        status:"api works!"
    })
});

module.exports = router;