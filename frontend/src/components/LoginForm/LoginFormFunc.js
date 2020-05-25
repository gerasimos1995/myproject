import React from 'react';
import { Col, Form,  FormGroup, Input, Label, Button } from 'reactstrap';

const LoginFormFunc = () => {
    return (
        <div>
            <div class="col-md-4 offset-md-4">
            <Form>
                <FormGroup row>
                    <Label for="user_username" md={3}>Username</Label>
                    <Col md={9}>
                        <Input required type="text" name="user_username" id="user_username" placeholder="Type your username" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="user_password">Password</Label>
                    <Input required type="password" name="user_password" id="user_password" placeholder="Type your password" />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" name="submit_userinfo" id="submit_userinfo">Submit</Button>
                </FormGroup>
            </Form>
            </div>
        </div>
    );
}
 
export default LoginFormFunc;
// ANTD
// import React from 'react';
// import { Form, Input, Layout, Checkbox, Button } from 'antd';
// import 'antd/dist/antd.css';
// import FormItem from 'antd/lib/form/FormItem';

// const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
// };

// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//     },
// };

// const LoginFormFunc = () => {
//     const onFinish = values => {
//         console.log('Success:', values);
//     };

//     const onFinishFailed = errorInfo => {
//         console.log('Failed:', errorInfo);
//     };

//     return ( 
//         <div>
//             <Form 
//             name="basic"
//             initialValues={{
//                 remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}>
//                 <FormItem 
//                 label="Username"
//                 name ="username" 
//                 rules={[{
//                         required: true,
//                         message: 'Please input your username!',
//                     },]}>
//                     <Input/>
//                 </FormItem>
//                 <Form.Item
//                     label="Password"
//                     name="password"
//                     rules={[
//                     {
//                         required: true,
//                         message: 'Please input your password!',
//                     },
//                     ]}
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item  name="remember" valuePropName="checked">
//                     <Checkbox>Remember me</Checkbox>
//                 </Form.Item>

//                 <Form.Item >
//                     <Button type="primary" htmlType="submit">
//                     Submit
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// }

// export default LoginFormFunc
