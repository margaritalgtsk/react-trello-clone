import React from 'react';
import {Button, Form, Input} from "antd";
import {editCard} from "../../../store/slices/boardSlice";
import {useAppDispatch} from "../../../store/hooks";
import {IEditFormValues} from "../../../types/types";
import classes from "./CardForm.module.css";

interface ICardFormProps {
    id: string;
    title: string;
    description?: string;
    listTitle: string;
}

type FieldType = {
    title: string;
    description?: string;
};

const CardForm: React.FC<ICardFormProps> = ({id, title, description, listTitle}) => {

    const [submittable, setSubmittable] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onFinish = (values: IEditFormValues): void => {
        setSubmittable(false)
        dispatch(editCard({id, listTitle, values}))
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            className={classes.cardForm}
            onValuesChange={() => setSubmittable(true)}
            onFinish={onFinish}
            autoComplete="off"
        >

            <Form.Item<FieldType>
                label="Title"
                name="title"
                rules={[{required: true, message: 'Please input Card Title'}]}
                initialValue={title}
                className={classes.cardFormItem}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Description"
                name="description"
                rules={[{message: 'Please input Card Description'}]}
                initialValue={description}
                className={classes.cardFormItem}
            >
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 6, span: 18}} className={classes.cardFormItem}>
                <Button type="primary" htmlType="submit" disabled={!submittable}>Save</Button>
            </Form.Item>
        </Form>
    );
};

export default CardForm;