import { useState, useEffect } from "react"; 
import StudentList from "./studentList";
import useGetRequest from "./useGetRequest";

const Content = () => {
    const [searchText, setSearchText] = useState("");
    const { data: students, isLoading, errorMessage } = useGetRequest('http://localhost:5000/students');
    
    const deleteHandler = (id) => {
        const list = students.filter(student => student.id != id);
    };

    return (
        <div>
            {isLoading && <div>Loading... Please wait</div>}
            {errorMessage && <div style={{"color" : "red"}}>{errorMessage}</div>}
            {students.length > 0 && <StudentList students={students} header="All Students" deleteHandler={deleteHandler}></StudentList>}
            <br/>
            <label>Search : </label>
            <input
            name='searchText'
            id='searchText'
            type='text'
            value={searchText}
            onChange={e => setSearchText(e.target.value) }
            ></input>
            {searchText && <StudentList students={students.filter((student) => student.course.toLowerCase() === searchText.toLowerCase())} header= {"Search Result - " + searchText} deleteHandler={deleteHandler}></StudentList>}
        </div>
    );
}

export default Content;

