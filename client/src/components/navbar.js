import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <h1>SkillSpire</h1>
                <div className="links">
                    <Link to="/list">List</Link>
                    <Link to="/create">Create New</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;