import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentCreate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [course, setCourse] = useState('python');

    // Question: what is the navigate going to be used for? 
    // we call this a .....          hook!
    const navigate = useNavigate();

    // LAST STEP
    const createStudent = (e) => {
        e.preventDefault();
        
        //1. show that the function runs
        console.log("We are creating a student");

        //5. get the data from the form
        const student = {firstName: firstName, lastName: lastName, course: course };

        //2. create a basic fetch first
        //3. give the method argument
        //4. give the header argument; we need to say what type of content we'll be sending with our request
        fetch('/students//', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(student)
            }
        ).then(() => { 
            //6. navigate to my list after creating a student
            navigate("/list");
        });
    }

    //1. create a component with the labels DO NOT ADD ONSUBMIT FOR FORM ELEMENT YET
    //2. create text inputs
    //3. create states for inputs
    //4. define options for Course (drop down menu)
    //5. createStudent function
    //6. to the form element add the onSubmit property
    return(
        <div className="create">
            <h2>Create a new student</h2>
            <form onSubmit={createStudent}>
                <label>First Name</label>
                <input
                type="text" 
                required 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}>
                </input>

                <label>Last Name</label>
                <input
                type="text" 
                required 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}>
                </input>

                <label>Course</label>
                <select value={course}
                onChange={(e) => setCourse(e.target.value)}>
                    <option value="python">PYTHON</option>
                    <option value="java">JAVA</option>
                    <option value="mern">MERN</option>
                    <option value="sql">SQL</option>
                </select>
                <button style={{"backgroundColor" : "blue"}}>Add Student</button>
            </form>
        </div>
    );
}
export default StudentCreate;