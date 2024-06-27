import React from 'react';
import {useDispatch} from "react-redux";
import {restoreList} from "../../store/slices/boardSlice";
import {IArchiveList, removeArchiveList} from "../../store/slices/archiveSlice";
import {Popconfirm, type PopconfirmProps, Tooltip} from "antd";
import {FaTrash, FaTrashArrowUp} from "react-icons/fa6";
import classes from "../Card/CardArchive/CardArchive.module.css";

interface IListArchiveProps {
    archiveList: IArchiveList;
}

const ListArchive: React.FC<IListArchiveProps> = ({archiveList}) => {

    const {listId, title} = archiveList
    const dispatch = useDispatch();

    const confirm: PopconfirmProps['onConfirm'] = () => {
        dispatch(removeArchiveList(listId))
    };

    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardTitle}>{title}</div>
            <Tooltip title="Send to baord">
                <FaTrashArrowUp
                    className={classes.restoreIcon}
                    onClick={() => {
                        dispatch(restoreList(archiveList))
                        dispatch(removeArchiveList(listId))
                    }}
                />
            </Tooltip>
            <Tooltip title="Delete permanently">
                <Popconfirm
                    title="Delete permanently"
                    description="All cards will be deleted!"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <FaTrash className={classes.deleteIcon} />
                </Popconfirm>
            </Tooltip>
        </div>
    );
};

export default ListArchive;