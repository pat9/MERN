const express = require('express');
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
});

router.get("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
})

router.post("/", async(req, res) =>{
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({status:"Task saved"});
});

router.put("/:id", async(req, res) =>{
    const { title, description } = req.body;
    const task = ({title, description});
    await Task.findOneAndUpdate(req.params.id,task);
    res.json({status:"Task updated"});
})

router.delete("/:id", async(req,res)=>{
    await Task.findOneAndDelete(req.params.id)
    res.json({status:"Task delated"})
})

module.exports = router;