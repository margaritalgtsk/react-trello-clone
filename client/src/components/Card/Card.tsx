import React, {useState} from 'react';
import CardForm from "./CardForm/CardForm";
import CardImages from "./CardImages/CardImages";
import {getImageUrl} from "../../utils/images";
import {Modal, UploadFile} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import classes from "./Card.module.css";

interface ICardProps {
    id: string;
    title: string;
    list: string;
    description?: string;
    images?: UploadFile[];
    cover?: UploadFile;
}

const Card: React.FC<ICardProps> = ({id, title, description, list, images, cover}) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = (): void => {
        setIsModalOpen(true);
    };

    const handleCancel = (): void => {
        setIsModalOpen(false);
    };

    return (
        <div className={classes.cardWrapper}>
            <div>{title}</div>
            {cover && <img className={classes.listCardCover} src={getImageUrl(cover.name)} alt={cover.name}/>}
            <div className={classes.editCardIcon} onClick={showModal}><EditOutlined /></div>

            <Modal title="Edit card" open={isModalOpen} onCancel={handleCancel} footer={null}>
                {cover && <img className={classes.imageCardCover} src={getImageUrl(cover.name)} alt={cover.name}/>}

                <CardForm id={id} title={title} description={description} list={list} />
                <CardImages id={id} list={list} images={images} cover={cover}/>
            </Modal>
        </div>
    );
};

export default Card;