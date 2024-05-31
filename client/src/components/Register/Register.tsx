import React, {useEffect} from 'react';
import classes from "./Register.module.css";
import {Button, Form, FormProps, Input, Spin} from "antd";
import {userRegister} from "../../asyncActions/authAction";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";
import {setError} from "../../store/slices/errorSlice";

type FieldType = {
    username?: string;
    password?: string;
    confirmPassword?: string;
};

interface IRegisterProps {
    handleClick: (value: boolean) => void;
}

const Register: React.FC<IRegisterProps> = ({handleClick}) => {

    const {loading, userToken, success} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (success && userToken) navigate('/dashboard')
    }, [navigate, userToken, success])

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const {username, password, confirmPassword} = values
        if(password === confirmPassword) {
            dispatch(userRegister({username, password}))
        } else {
            dispatch(setError({message: 'Password mismatch!', type: 'error'}))
        }
    };

    return (
        <>
            <Form
                name="basic"
                className={classes.formLogin}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className={classes.formTitleLogin}>
                    <h3>Please register to continue</h3>
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

                <Form.Item<FieldType>
                    label="Confirm password"
                    name="confirmPassword"
                    rules={[{required: true, message: 'Please confirm your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item className={classes.buttonLogin} wrapperCol={{span: 24}}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

                <div className={classes.linkRegister}>
                    Already have an account?
                    <div className={classes.buttonLink} onClick={() => handleClick(true)}>
                        Login here
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Register;