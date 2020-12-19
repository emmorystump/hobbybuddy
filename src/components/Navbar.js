import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({email}) => {
    
    return (
        <div>
            <nav>
                <div className="navbar-left">
                    <Link to="/profile" >  {email} </Link>
                </div>
                <div className="navbar-middle">
                    <Link to="/"> Hobby Buddy </Link>
                </div>

                <div className="navbar-right"></div>
                    <Link to="/login"> Sign Out </Link>
            </nav>
        </div>
    )
}

export default Navbar;