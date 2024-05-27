import React, {useEffect} from 'react';
import {FormProps, Spin} from 'antd';
import { Button, Form, Input } from 'antd';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {userLogin} from "../../asyncActions/authAction";
import {useNavigate} from "react-router-dom";
import classes from "./Login.module.css";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login = () => {

    const {loading, userInfo, error} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard')
        }
    }, [navigate, userInfo])

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const {username, password} = values
        dispatch(userLogin({username, password}))
    };

    return (
        <div>
            <Form
                name="basic"
                className={classes.formLogin}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className={classes.formTitleLogin}>
                    <h3>Please login to continue</h3>
                    <div className={classes.formLoginSpin}>
                        {loading && <Spin />}
                    </div>
                </div>

                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item className={classes.buttonLogin} wrapperCol={{span: 24}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;