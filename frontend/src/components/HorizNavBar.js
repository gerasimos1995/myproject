import React, { useContext } from 'react'
import LoggedMenu from './LoggedMenu'
import GeneralMenu from './GeneralMenu'
import {userContext} from './../App'
import SignupForm from './LoginForm/SignupForm'
import LoginForm from './LoginForm/LoginForm'

function HorizNavBar() {
    const user = useContext(userContext)

    return (
        <nav>
            My City
            {user.userState.isUserLoggedIn? <LoggedMenu/> : <GeneralMenu/> }
            <SignupForm/>
            <LoginForm/>
        </nav>
    )
}

export default HorizNavBar
