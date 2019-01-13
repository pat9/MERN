const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require("./database");
const app = express();

//Congiruacion
app.set("port", process.env.PORT || 3000);
//Middleware
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use("/api/tasks",require("./routes/task.routes.js"));
//Static Files
app.use(express.static(path.join(__dirname, "public")))
//Server
app.listen(app.get("port"),()=>{
    console.log(`Server is running in ${app.get("port")}`)
});