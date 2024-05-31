import React, {useEffect} from 'react';
import {FormProps, Spin} from 'antd';
import {Button, Form, Input} from 'antd';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {userLogin} from "../../asyncActions/authAction";
import {useNavigate} from "react-router-dom";
import classes from "./Login.module.css";

type FieldType = {
    username?: string;
    password?: string;
};

interface ILoginProps {
    handleClick: (value: boolean) => void;
}

const Login: React.FC<ILoginProps> = ({handleClick}) => {

    const {loading, userToken} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) {
            navigate('/dashboard')
        }
    }, [navigate, userToken])

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const {username, password} = values
        dispatch(userLogin({username, password}))
    };

    return (
        <>
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
                        Login
                    </Button>
                </Form.Item>

                <div className={classes.linkRegister}>
                    Don't have an account?
                    <div className={classes.buttonLink} onClick={() => handleClick(false)}>
                        Register here
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Login;