import React, {useState} from 'react';
import CardForm from "./CardForm/CardForm";
import CardImages from "./CardImages/CardImages";
import {getImageUrl} from "../../utils/images";
import {Button, Modal} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {FaTrash} from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {removeFromBoardCard, selectCurrentBoardId} from "../../store/slices/boardSlice";
import {addToArchiveCard} from "../../store/slices/archiveSlice";
import {ICard} from "../../types/types";
import classes from "./Card.module.css";

interface ICardProps {
    index: number;
    listTitle: string;
    cardItem: ICard;
}

const Card: React.FC<ICardProps> = ({index, listTitle, cardItem }) => {

    const {id, title, description, images, cover} = cardItem;
    const boardId = useAppSelector(selectCurrentBoardId);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const showModal = (): void => {
        setIsModalOpen(true);
    };

    const handleCancel = (): void => {
        setIsModalOpen(false);
    };

    const handleArchiveClick = () => {
        dispatch(removeFromBoardCard({id, listTitle}))
        dispatch(addToArchiveCard({boardId, listTitle, task: cardItem, index}))
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
                <Button className={classes.buttonArchive} onClick={handleArchiveClick}>Archive<FaTrash className={classes.buttonArchiveIcon}/></Button>
            </Modal>
        </div>
    );
};

export default Card;