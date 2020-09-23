import { Col, Form,  FormGroup, Input, Label, Button } from 'reactstrap';
// import '../../index.css'
import React, { useContext, useState } from 'react'
import {userContext} from '../../App'

function LoginForm() {
        const user = useContext(userContext)

        const [userName, setuserName] = useState('')
        const [passWord, setpassWord] = useState('')

        const checkValidation = () => {
            // console.log("from check valid: ", JSON.stringify(user.userState.user.username))
            // console.log("state variables are: " ,userName, passWord)
            if (JSON.stringify(userName) == JSON.stringify(user.userState.userInfo.username)){
                if (JSON.stringify(passWord) == JSON.stringify(user.userState.userInfo.password)){
                    user.userDispatch({
                        type: 'login-success'
                    })
                }else{
                    console.log("Unsuccessfull")
                }
            }else{
                console.log("Unsuccessfull")
            }
        }

        return (
        <div>
            <div className="col-md-4 offset-md-4">
                <Form>
                    <FormGroup row>
                        <Label for="user_username" md={3}>Username</Label>
                        <Col md={9}>
                            <Input type="text" placeholder="Type your username" onChange={(e) => {
                                setuserName(e.target.value)
                            }}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="user_password" md={3}>Password</Label>
                        <Col md={9}>
                            <Input type="password" placeholder="Type your password" onChange={(e) => {
                                setpassWord(e.target.value)
                            }}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" onClick={(e) => {
                            e.preventDefault()
                            checkValidation()
                        }}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm
