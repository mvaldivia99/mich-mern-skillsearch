import { useParams, useNavigate } from 'react-router-dom';
import useGetRequest from './useGetRequest';

const StudentDetails = () => {

    // useParams
    // get the parameters from the url(?)
    const { id } = useParams();

    // from content.js, change students to students
    const { data: student, isLoading, errorMessage } = useGetRequest('http://localhost:5000/students/'+id);

    // for changing route after delete
    const navigate = useNavigate();

    //========= final step!
    const deleteStudent = () => {
        fetch('http://localhost:5000/students/' + student._id, {
            method: 'DELETE'
        })
        .then(() => {
            navigate("/list");
        });
        console.log("deleting student");
    }

    return (
        <div className="student-details">
            {isLoading && <div>Loading... Please wait.</div>}
            {errorMessage && <div style={{color: "red"}}>{errorMessage}</div>}
            {student && 
                <article>
                    <h2>{student.firstName} {student.lastName}</h2>
                    <p>Enrolled to {student.course}</p>
                    <button onClick={deleteStudent} style={{color: "red"}}>Delete</button>
                </article>
            }
        </div>
    );

};

export default StudentDetails;