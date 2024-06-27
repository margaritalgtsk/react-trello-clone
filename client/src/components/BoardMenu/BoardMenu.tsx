import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectArchiveCards, selectArchiveLists} from "../../store/slices/archiveSlice";
import {removeBoard, selectCurrentBoardId} from "../../store/slices/boardSlice";
import CardArchive from "../Card/CardArchive/CardArchive";
import ListArchive from "../ListArchive/ListArchive";
import {Button, Divider, Popconfirm} from "antd";
import type {PopconfirmProps} from 'antd';
import classes from "./BoardMenu.module.css";

const BoardMenu = () => {

    const boardId = useAppSelector(selectCurrentBoardId);

    const archiveCards = useAppSelector(selectArchiveCards);
    const currentArchiveCards = archiveCards.filter(item => item.boardId === boardId); //or get current at once

    const archiveLists = useAppSelector(selectArchiveLists);
    const currentArchiveLists = archiveLists.filter(item => item.boardId === boardId); //or get current at once

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const confirm: PopconfirmProps['onConfirm'] = () => {
        dispatch(removeBoard())
        navigate('/workspace')
    };

    return (
        <div className={classes.container}>

            <h4 className={classes.title}>Menu</h4>
            <Divider className={classes.divider}/>

            <h4 className={classes.subTitle}>Archive Cards</h4>
            {currentArchiveCards.length === 0 && <p className={classes.emptyArchive}>Archive is empty</p>}
            {currentArchiveCards.map((card) =>
                <CardArchive key={card.task.id} index={card.index} listId={card.listId} listTitle={card.listTitle} cardItem={card.task}/>
            )}
            <Divider className={classes.divider}/>

            <h4 className={classes.subTitle}>Archive Lists</h4>
            {currentArchiveLists.length === 0 && <p className={classes.emptyArchive}>Archive is empty</p>}
            {currentArchiveLists.map((list) =>
                <ListArchive key={list.listId} archiveList={list}/>
            )}
            <Divider className={classes.divider}/>

            <h4 className={classes.subTitle}>Settings</h4>
            <Popconfirm
                title="Remove board"
                description="Are you sure to remove this board?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>Remove board</Button>
            </Popconfirm>
        </div>
    );
};

export default BoardMenu;