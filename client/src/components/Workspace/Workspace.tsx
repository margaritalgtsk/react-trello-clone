import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addBoard, resetCurrent, selectBoards, setCurrent} from "../../store/slices/boardSlice";
import {Modal} from "antd";
import type {FormProps} from 'antd';
import {Button, Form, Input} from 'antd';
import classes from "./Workspace.module.css";

type FieldType = {
    title?: string;
};

const Workspace = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const boards = useAppSelector(selectBoards);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetCurrent())
    }, []);

    const handleClick = (id: string) => {
        dispatch(setCurrent(id))
        navigate('/board/')
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        dispatch(addBoard({title: values.title}))
        setIsModalOpen(false);
        //navigate('/board/')
    };

    return (

        <div className={classes.workspaceContainer}>
            {boards.map(board =>
                <div key={board.id} className={classes.workspaceBoard} onClick={() => handleClick(board.id)}>
                    {board.title}
                </div>
            )}
            <div className={`${classes.workspaceBoard} ${classes.workspaceAddBoard}`} onClick={showModal}>
                Add new board
            </div>
            <Modal title="Add new board" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="addBoard"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    style={{maxWidth: 600}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Board title"
                        name="title"
                        rules={[{ required: true, message: 'Please input board title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 6, span: 18}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Workspace;