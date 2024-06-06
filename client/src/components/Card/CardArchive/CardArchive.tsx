import React from 'react';
import {useDispatch} from "react-redux";
import {restoreCard} from "../../../store/slices/boardSlice";
import {removeArchiveCard} from "../../../store/slices/archiveSlice";
import {ICardExtended} from "../../../types/types";
import {ExportOutlined, DeleteOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import classes from "./CardArchive.module.css";

const CardArchive: React.FC<ICardExtended> = ({index, listTitle, cardItem}) => {

    const dispatch = useDispatch();

    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardTitle}>{cardItem.title}</div>
            <Tooltip title="Send to baord">
                <ExportOutlined
                    className={classes.restoreIcon}
                    onClick={() => {
                        dispatch(restoreCard({listTitle, cardItem}))
                        dispatch(removeArchiveCard(cardItem.id))
                    }}
                />
            </Tooltip>
            <Tooltip title="Delete permanently">
                <DeleteOutlined
                    className={classes.deleteIcon}
                    onClick={() => dispatch(removeArchiveCard(cardItem.id))}
                />
            </Tooltip>
        </div>
    );
};

export default CardArchive;