import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { userContext } from '../../App'

import { Col, Form,  FormGroup, Input, Label, Button } from 'reactstrap';

import axios from '../../config/axiosConfig.js'
import { API_BASE_URL } from '../../constants/constants.js'

function SignupForm() {
    const user = useContext(userContext)

    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const registerNewUser = () => {
        //console.log("Trying to register new user: " + userName + "," + passWord + "," + eMail)
        return axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            email,
            password
        }).then((res) => {
            console.log('Registration Successfull! ' + JSON.stringify(res))
            //Here based on the status code returned I can do stuff
        }).catch(error => {
            console.log(error)
        })
    }

    const registerNewUser2 = async () => {
        
        console.log("Trying to register new user: " + username + "," + password + "," + email)
        const { res } = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/auth/register`,
            data: {
                username: username,
                password: password,
                email: email
            }
        }).then(res =>{
            console.log(res.data)
            user.userDispatch({
                type: 'signup', 
                payload: {
                    username: username,
                    email: email
                }
            })
            history.push('/')
            return(res.data)
        }).catch(err => {
            console.log(err)
        })
    } 
    
    return (
        <div className="col-md-4 offset-md-4">
            <Form>
                <h1>Register</h1>
                <FormGroup row>
                    <Label for="user_username" md={3}>Username</Label>
                    <Col md={9}>
                        <Input type="text" placeholder="Type your username" onChange={(e) => {
                            e.preventDefault()
                            setUsername(e.target.value)
                        }}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="user_password" md={3}>Password</Label>
                    <Col md={9}>
                        <Input type="password" placeholder="Type your password" onChange={(e) => {
                            e.preventDefault()
                            setPassword(e.target.value)
                        }}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="user_email" md={3}>Email</Label>
                    <Col md={9}>
                        <Input type="text" placeholder="Type your email" onChange={(e) => {
                            e.preventDefault()
                            setEmail(e.target.value)
                        }}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" onClick={(e) => {
                        e.preventDefault()
                        registerNewUser2()
                        //const { dataReturned } = registerNewUser2()
                        //console.log("Inside the on handleClick:" + JSON.stringify(dataReturned))
                    }}>Sign Up</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default SignupForm
