const express = require('express');
const morgan = require('morgan');
const app = express();

//Congiruacion
app.set("port", process.env.PORT || 3000);
//Middleware
app.use(morgan('dev'));
app.use(express.json());
//Routes

//Static Files

//Server
app.listen(app.get("port"),()=>{
    console.log(`Server is running in ${app.get("port")}`)
});