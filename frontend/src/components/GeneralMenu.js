import React from 'react'
import { Link} from 'react-router-dom'

function GeneralMenu() {
    return (
        <nav>
            
            <Link to="/login">
                <li>Login</li>
            </Link>
            
            <Link to="/signup">
                <li>Signup</li>
            </Link>
            
            <li>About us</li>
        </nav>
    )
}

export default GeneralMenu

