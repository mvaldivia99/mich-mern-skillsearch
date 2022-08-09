import Content from "./components/content";
import Navbar from "./components/navbar";
import css from "./App.css"

// new content
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import StudentDetails from "./components/studentdetails";
import StudentCreate from "./components/studentcreate";

function App() {
  return (
    <Router>
      <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/create" element={<StudentCreate></StudentCreate>}></Route>
            <Route path="/list" element={<Content></Content>}></Route>
            <Route path="/" element={<div><h1>Welcome Page. Please select list to view student or click create new to create students.</h1></div>}></Route>
            <Route path="/students/:id" element={<StudentDetails></StudentDetails>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;

