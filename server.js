// import the packages we need
// mongoose, express
const mongoose = require("mongoose");
const express = require("express");
const students = require("./students");
const cors = require("cors");
const path = require("path");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://michellv:f8s0gxWdoqJh9IWs@mern-skill.dhhweqp.mongodb.net/SkillSpireSearch', { useNewUrlParser : true})
.then(() => {
    // create a backend server that will listen to our requests
    // listen for the student path (req.url: /students)
    // send data to front-end

    const app = express();
    app.use(cors());
    
    app.listen(PORT, () => {
        console.log("server has started");
    });

    if (process.env.NODE_ENV === "production"){
        app.use(express.static("client/build"));

        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }


    // will retrieve the students page and display all students
    app.get("/students", async(req, res) => {
        // what takes time? what should we wait for: data from database
        // send my data; what format? : JSON
        // send the response

        const data = await students.find(); // mongodb function
        
        res.json(data);

    })

    //app.use(express.json());-----------------ERROR !!!!!
    app.get("/students/:id", async(req, res)=>{

        try {
            const student = await students.findOne({_id: req.params.id});
            res.json(student);
        } catch {
            console.log("Error: get request incomplete");
            res.json({error: "student does not exist"});
            res.status(404);
        }
    })

    // POST Request - Postman
    // path, body, insert into MongoDB
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
        res.json();
    })

    app.delete("/students/:id", async(req, res) =>{
        try {
            await students.deleteOne({_id: req.params.id});
            res.status(204).send();
        } catch {
            res.json({error: "student does not exist"});
            res.status(404);
        }
    })

    app.put("/students/:id", async(req, res) => {
        try {
            const student = await students.findOne({_id: req.params.id});
            console.log(student);
            console.log(req.body);
            if (req.body.firstName){
                student.firstName = req.body.firstName;
            }

            if (req.body.lastName){
                student.lastName = req.body.lastName;
            }

            if (req.body.course){
                student.course = req.body.course;   
            }

            if (req.body.fee){
                student.fee = req.body.fee;
            }

            if (req.body.location){
                student.location = req.body.location;
            }

           

            await student.save();
            res.json(student);

        } catch {
            res.json({error: "student does not exist"});
            res.status(404);
        }
    })
});


