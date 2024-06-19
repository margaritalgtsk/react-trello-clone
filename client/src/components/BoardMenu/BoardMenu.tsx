import React from 'react';
import {selectArchiveCards} from "../../store/slices/archiveSlice";
import {useAppSelector} from "../../store/hooks";
import CardArchive from "../Card/CardArchive/CardArchive";
import {selectCurrentBoardId} from "../../store/slices/boardSlice";
import {Divider} from "antd";
import classes from "./BoardMenu.module.css";

const BoardMenu = () => {

    const archiveCards = useAppSelector(selectArchiveCards);
    const boardId = useAppSelector(selectCurrentBoardId);
    const currentArchiveCards = archiveCards.filter(item => item.boardId === boardId); //or get current at once

    return (
        <div className={classes.boardMenuContainer}>
            <h4 className={classes.boardMenuTitle}>Menu</h4>
            <Divider className={classes.boardMenuDivider}/>
            {currentArchiveCards.length > 0 && <h4 className={classes.boardMenuSubTitle}>Archive Card</h4>}
            {currentArchiveCards.map((card) =>
                <CardArchive key={card.task.id} index={card.index} listTitle={card.listTitle} cardItem={card.task}/>
            )}
        </div>
    );
};

export default BoardMenu;