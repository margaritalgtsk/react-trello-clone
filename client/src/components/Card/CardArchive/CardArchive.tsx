import React from 'react';
import {useDispatch} from "react-redux";
import {restoreCard} from "../../../store/slices/boardSlice";
import {removeArchiveCard} from "../../../store/slices/archiveSlice";
import {ICard} from "../../../types/types";
import {FaTrash, FaTrashArrowUp} from "react-icons/fa6";
import {Tooltip} from "antd";
import classes from "./CardArchive.module.css";

interface ICardArchiveProps {
    index: number;
    listId: string;
    listTitle: string;
    cardItem: ICard;
}

const CardArchive: React.FC<ICardArchiveProps> = ({index, listId, listTitle, cardItem}) => {

    const dispatch = useDispatch();

    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardTitle}>{cardItem.title}</div>
            <Tooltip title="Send to baord">
                <FaTrashArrowUp
                    className={classes.restoreIcon}
                    onClick={() => {
                        dispatch(restoreCard({index, listId, listTitle, cardItem}))
                        dispatch(removeArchiveCard(cardItem.id))
                    }}
                />
            </Tooltip>
            <Tooltip title="Delete permanently">
                <FaTrash
                    className={classes.deleteIcon}
                    onClick={() => dispatch(removeArchiveCard(cardItem.id))}
                />
            </Tooltip>
        </div>
    );
};

export default CardArchive;