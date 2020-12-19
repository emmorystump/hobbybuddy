import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({name}) => {
    
    return (
        <div>
            <nav>
                <div className="navbar-left">
                    <Link to="/profile" >  {name} </Link>
                </div>
                <div className="navbar-middle">
                    <Link to="/"> Hobby Buddy </Link>
                </div>

                <div className="navbar-right"><Link to="/"> Sign Out </Link></div>
                    
            </nav>
        </div>
    )
}

export default Navbar;