//mongoose has been installed

// must use mongoose
const mongoose = require("mongoose");

// create two schemas for the current students collection   
// param1: what is the schema model, 
// param1: what is the collection
const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    course: String,
    //_id: mongoose.ObjectId,// COMMENTED OUT WHEN MAKING POST REQUEST
    fee: Number
}, {collection: 'Students'});

//export the model so we can use it in our application
// so we can use it somewhere else in our project
module.exports = mongoose.model("students", schema);