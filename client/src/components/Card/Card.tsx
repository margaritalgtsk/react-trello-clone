import React, {useState} from 'react';
import {Button, Modal, Form, Input, Upload, UploadFile, GetProp, UploadProps} from 'antd';
import {useAppDispatch} from "../../store/hooks";
import {editItem} from "../../store/slices/boardSlice";
import {setError} from "../../store/slices/errorSlice";
import {IEditFormValues} from "../../types/types";
import {MdOutlineModeEdit} from "react-icons/md";
import {PlusOutlined} from '@ant-design/icons';
import classes from "./Card.module.css";

interface ICardProps {
    id: string;
    title: string;
    list: string;
    description?: string;
    images?: UploadFile[];
}

type FieldType = {
    title: string;
    description?: string;
    images?: UploadFile[];
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type GetFileType = {
    file: UploadFile;
    fileList: UploadFile[];
}

const Card: React.FC<ICardProps> = ({id, title, description, list, images}) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const dispatch = useAppDispatch();

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [previewTitle, setPreviewTitle] = useState<string>('');
    const [form] = Form.useForm();

    const showModal = (): void => {
        setIsModalOpen(true);
    };

    const handleCancel = (): void => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const normFile = (e: GetFileType): UploadFile[]  => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleCancelPreview = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile): Promise<void> => {
        if (!file.url && !file.preview) {
            let tempProps = JSON.parse(JSON.stringify(file));
            tempProps.preview = await getBase64(file.originFileObj as FileType);
            Object.preventExtensions(tempProps);
            setPreviewImage(tempProps.preview as string);
        } else {
            setPreviewImage(file.url || (file.preview as string));
        }
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleFileChange: UploadProps['onChange'] = ({fileList}: {fileList: UploadFile[]}): void  => {
        setFileList(fileList);
    }

    const onFinish = async (values: IEditFormValues): Promise<void> => {
        let formData = new FormData()
        for (const file of fileList) {
            formData.append("file", file.originFileObj as Blob);
        }

        const response = await fetch('http://localhost:8080/image', {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            dispatch(setError(`Upload error, ${response.statusText}`))
        } else {
            setIsModalOpen(false);
            dispatch(editItem({id, list, values}))
        }
    };

    return (
        <div className={classes.cardWrapper}>
            <div>{title}</div>
            <div className={classes.editCardIcon} onClick={showModal}><MdOutlineModeEdit /></div>

            <Modal title="Edit card" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    className={classes.cardForm}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Title"
                        name="title"
                        rules={[{required: true, message: 'Please input Card Title'}]}
                        initialValue={title}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                        rules={[{message: 'Please input Card Description'}]}
                        initialValue={description}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Images"
                        name="images"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload listType="picture-card"
                                defaultFileList={images}
                                onPreview={handlePreview}
                                onChange={handleFileChange}
                                beforeUpload={() => false}
                        >
                            <button className={classes.buttonUpload} type="button">
                                <PlusOutlined />
                                <div className={classes.buttonUploadText}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>

                <Modal title={previewTitle} open={previewOpen} onCancel={handleCancelPreview} footer={null}>
                    <img alt={previewTitle} className={classes.imagePreview} src={previewImage}/>
                </Modal>
            </Modal>
        </div>
    );
};

export default Card;