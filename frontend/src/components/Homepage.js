import React, { useState } from 'react'

import { Button } from 'reactstrap'

import { userContext } from '../App'

import HorizNavBar from './HorizNavBar'
import LoginForm from './LoginForm/LoginForm'
import SignupForm from './LoginForm/SignupForm'

function Homepage() {
    //const user = useContext(userContext)

    const [ isRegisterClicked, setRegisterClicked ] = useState(false)
    return (
        <div>
            <HorizNavBar/>
            <h1>Hello this is my project</h1>
            {isRegisterClicked ? <SignupForm/> : <LoginForm/>}
            <Button type="text" >Register</Button>
        </div>
    )
}

export default Homepage
