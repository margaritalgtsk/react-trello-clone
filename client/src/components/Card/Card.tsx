import React, {useState} from 'react';
import CardForm from "./CardForm/CardForm";
import CardImages from "./CardImages/CardImages";
import {getImageUrl} from "../../utils/images";
import {Button, Modal} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {useAppDispatch} from "../../store/hooks";
import {archiveCard} from "../../store/slices/boardSlice";
import {addArchiveCard} from "../../store/slices/archiveSlice";
import {ICardExtended} from "../../types/types";
import classes from "./Card.module.css";

const Card: React.FC<ICardExtended> = ({index, listTitle, cardItem }) => {

    const {id, title, description, images, cover} = cardItem;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const showModal = (): void => {
        setIsModalOpen(true);
    };

    const handleCancel = (): void => {
        setIsModalOpen(false);
    };

    const handleArchiveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(archiveCard({id, listTitle}))
        dispatch(addArchiveCard({index, listTitle, cardItem}))
    };

    return (
        <div className={classes.cardWrapper}>
            <div>{title}</div>
            {cover && <img className={classes.listCardCover} src={getImageUrl(cover.name)} alt={cover.name}/>}
            <div className={classes.editCardIcon} onClick={showModal}><EditOutlined /></div>

            <Modal title="Edit card" open={isModalOpen} onCancel={handleCancel} footer={null}>
                {cover && <img className={classes.imageCardCover} src={getImageUrl(cover.name)} alt={cover.name}/>}

                <CardForm id={id} title={title} description={description} listTitle={listTitle} />
                <CardImages id={id} listTitle={listTitle} images={images} cover={cover}/>
                <Button className={classes.buttonArchive} onClick={handleArchiveClick}>Archive<DeleteOutlined /></Button>
            </Modal>
        </div>
    );
};

export default Card;