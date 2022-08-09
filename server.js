const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const students = require("./students.js");
const cors = require("cors"); //AADDDD AT END


//1. 
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";

// process.env reads environmental variables that were set when the process was started
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://michellv:f8s0gxWdoqJh9IWs@mern-skill.dhhweqp.mongodb.net/SkillSpireSearch', { useNewUrlParser: true })
.then(() => {

    const app = express();
    app.use(cors()); 
    app.listen(PORT, () => { //2. change the port variable
        console.log("server has started");
    })


    //2. 
    if (process.env.NODE_EV === "production"){
        app.use(express.static("client/build"));
    }

    app.get("/students", async(req, res) =>{
        
        const data = await students.find();
        res.send(data);

    }) 

   
    app.get("/students/:id", async(req, res) => {
        
        try {
            const student = await students.findOne({_id: req.params.id});
            console.log(student);
            res.json(student);
        } catch {
            console.log("Error: problem");
            res.json({error : "student does not exist"});
            res.status(404);
        } 
 
    })

    app.use(express.json());  
    app.post("/students", async(req, res) => {
        console.log(req.body);
        
        const student = new students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            course: req.body.course,
            fee: req.body.fee,
        });
 
        await student.save();
        res.json(student);
    })


    app.put("/students/:id", async(req, res) =>{
        try{
            const student = await students.findOne({_id: req.params.id});
            console.log(student);

            if (req.body.firstName){
                student.firstName = req.body.firstName;
            }
            if (req.body.lastName){
                student.lastName = req.body.lastName;
            }
            if (req.body.course){
                student.course = req.body.course;
            }
            if (req.body.location){
                student.location = req.body.location;
            }
            if (req.body.fee){
                student.fee = req.body.fee;
            }

            await student.save();
            res.json(student);
        } catch{
            res.json({error : "student does not exist"});
            res.status(404);
        }
    })



    app.delete("/students/:id", async(req, res) =>{
        try {
            await students.deleteOne({_id: req.params.id});
            res.status(204).send(); 
        } catch {
            res.json({error : "student does not exist"});
            res.status(404);
        }
    })
})
