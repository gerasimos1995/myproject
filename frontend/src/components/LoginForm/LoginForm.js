import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {userContext} from '../../App'

import { Col, Form,  FormGroup, Input, Label, Button } from 'reactstrap';

import axios from '../../config/axiosConfig.js'
import { API_BASE_URL } from '../../constants/constants.js'

function LoginForm() {
        const user = useContext(userContext)

        const history = useHistory()

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        const loginUser = async () => {
                console.log("Trying to login user: " + username + " with: " + password)
                await axios({
                    method: 'POST',
                    url: `${API_BASE_URL}/auth/authenticate`,
                    data: {
                        username: username,
                        password: password
                    }
                }).then(res => {
                    console.log(JSON.stringify(res.status))
                    console.log(JSON.stringify(res.data.token))
                    let token = res.data.token
                    localStorage.setItem('userToken', 'Bearer ' + token)
                    if (res.status == "200"){
                        user.userDispatch({
                            type: 'login-success',
                            payload: {
                                username: username,
                                email: "email"
                            }
                        })
                        console.log("Login Success")
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(JSON.stringify(err))
                    user.userDispatch({type: 'login-failure'})
                    history.push('')
                })
        }

        return (
        <div>
            <div className="col-md-4 offset-md-4">
                <Form>
                    <h1>Login</h1>
                    <FormGroup row>
                        <Label for="user_username" md={3}>Username</Label>
                        <Col md={9}>
                            <Input type="text" placeholder="Type your username" onChange={(e) => {
                                setUsername(e.target.value)
                            }}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="user_password" md={3}>Password</Label>
                        <Col md={9}>
                            <Input type="password" placeholder="Type your password" onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" onClick={(e) => {
                            e.preventDefault();
                            loginUser()
                        }}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm
