import React from 'react';
import {selectArchiveCards} from "../../store/slices/archiveSlice";
import {useAppSelector} from "../../store/hooks";
import CardArchive from "../Card/CardArchive/CardArchive";
import classes from "./BoardMenu.module.css";

const BoardMenu = () => {

    const archiveCards = useAppSelector(selectArchiveCards);

    return (
        <div className={classes.boardMenuContainer}>
            <h3>Board Menu</h3>
            <h4>Archive Card</h4>
            {archiveCards.map((card) =>
                <CardArchive key={card.cardItem.id} index={card.index} listTitle={card.listTitle} cardItem={card.cardItem}/>
            )}
        </div>
    );
};

export default BoardMenu;