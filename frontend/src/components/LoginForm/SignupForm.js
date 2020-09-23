import React, { useState } from 'react'
import { Col, Form,  FormGroup, Input, Label, Button } from 'reactstrap';
import { useContext } from 'react'
import { userContext } from '../../App'

function SignupForm() {
    const user = useContext(userContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="col-md-4 offset-md-4">
            <Form>
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
                <FormGroup>
                    <Button type="submit" onClick={(e) => {
                        e.preventDefault()
                        //console.log("Inside signup the userState is: ", JSON.stringify(user.userState))
                        console.log("i sent: ", username, password)
                        user.userDispatch({
                            type: 'signup', 
                            payload: {
                                username: username,
                                password: password
                            }
                        })
                    }}>Sign Up</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default SignupForm
