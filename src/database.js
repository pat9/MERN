const mongoose = require('mongoose');
const connection = "mongodb://localhost/mern-tasks";

mongoose.connect(connection).then(db=>{
    console.log("database is connected");

}).catch(err=>{
    console.log(err);
});

module.exports = mongoose;