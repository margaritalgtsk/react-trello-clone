import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided} from "react-beautiful-dnd";
import Card from "../Card/Card";
import AddCardForm from "../AddCardForm/AddCardForm";
import {ICard, IListContent} from "../../types/types";
import {useAppSelector} from "../../store/hooks";
import {removeListFromBoard, selectCurrentBoardId, selectSearchQuery} from "../../store/slices/boardSlice";
import {addListToArchive} from "../../store/slices/archiveSlice";
import {Button} from "antd";
import {EllipsisOutlined, CloseOutlined} from '@ant-design/icons';
import classes from "./Column.module.css"

interface IColumnProps {
    columnId: string;
    index: number;
    column: IListContent;
}

const Column: React.FC<IColumnProps> = ({columnId, column, index}) => {

    const [isListAction, setIsListAction] = useState<boolean>(false);
    const searchQuery = useAppSelector(selectSearchQuery);
    const boardId = useAppSelector(selectCurrentBoardId);
    const dispatch = useDispatch();

    const handleArchiveList = (column: IListContent) => {
        dispatch(removeListFromBoard(column.listId))
        const itemArchiveList = {
            boardId,
            listId: column.listId,
            title: column.title,
            tasks: column.tasks,
            index
        }
        dispatch(addListToArchive(itemArchiveList))
    }

    return (
        <Draggable draggableId={columnId} index={index} key={columnId}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                const draggingColumnClass = snapshot.isDragging ? classes.columnItemDragging : '';
                return (
                    <div
                        className={`${classes.columnItem} ${draggingColumnClass}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <EllipsisOutlined className={classes.listActionsOpen} onClick={() => setIsListAction(true)}/>
                        {isListAction &&
                            <>
                                <div className={classes.listActions}>
                                    <div  className={classes.listActionsTitle}>List Actions</div>
                                    <CloseOutlined  className={classes.listActionsClose} onClick={() => setIsListAction(false)}/>
                                    <Button type="text" onClick={() =>handleArchiveList(column)}>Archive List</Button>
                                </div>
                            </>
                        }
                        <h3  {...provided.dragHandleProps}>{column.title}</h3>
                        {searchQuery && <p className={classes.matchFilters}>{column.tasks.filter(task => task.isSearchMatch).length} cards match filters</p>}
                        <Droppable droppableId={columnId} type="task">
                            {(provided: DroppableProvided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {column.tasks && column.tasks.map((el: ICard, index: number) => {
                                            return (
                                                <Draggable key={el.id} index={index} draggableId={el.id}>
                                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                                        const draggingCardClass = snapshot.isDragging ? classes.cardItemDragging : '';
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className={`${classes.cardItem} 
                                                                ${draggingCardClass} 
                                                                ${el.isSearchMatch ? '' : classes.cardHidden}
                                                                `}>
                                                                    <Card
                                                                        index={index}
                                                                        cardItem={el}
                                                                        listId={column.listId}
                                                                        listTitle={columnId}
                                                                        boardId={boardId}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                        <AddCardForm listTitle={columnId}/>
                    </div>
                )
            }}
        </Draggable>
    );
};

export default Column;