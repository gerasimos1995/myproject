import React, { useContext } from 'react'
import LoggedMenu from './LoggedMenu'
import GeneralMenu from './GeneralMenu'
import {userContext} from './../App'

function HorizNavBar() {
    const user = useContext(userContext)

    return (
        <nav>
            {user.userState.isUserLoggedIn? <div>Hey {user.userState.userInfo.username}</div> : <div>Hey USER</div>}
            {user.userState.isUserLoggedIn? <LoggedMenu/> : <GeneralMenu/> }
        </nav>
    )
}

export default HorizNavBar
