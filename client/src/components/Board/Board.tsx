import React from 'react';
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
    DropResult
} from 'react-beautiful-dnd';
import AddListForm from "../AddListForm/AddListForm";
import Column from "../Column/Column";
import {IList} from "../../types/types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {moveCard, reorderLists, selectOrder} from "../../store/slices/boardSlice";
import classes from './Board.module.css';

interface IBoardProps {
    lists: IList;
}

const Board: React.FC<IBoardProps> = ({lists}) => {

    const columnOrder = useAppSelector(selectOrder);
    const dispatch = useAppDispatch();

    const handleDragEnd = ({destination , source, type, draggableId}: DropResult): void => {
        if (!destination) {
            return
        }
        if(type === 'column') {
            const newColumnOrder = Array.from(columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            dispatch(reorderLists(newColumnOrder))
        } else {
            if (destination.index === source.index && destination.droppableId === source.droppableId) {
                return
            }
            const cardCopy = {...lists[source.droppableId].tasks[source.index]}
            dispatch(moveCard({destination, source, cardCopy}))
        }
    }

    return (
        <div className={classes.boardWrapper}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided: DroppableProvided) => (
                        <div
                            className={classes.boardContainer}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {columnOrder.map((columnId: string, index: number) => {
                                return (
                                    <Column key={columnId} columnId={columnId} column={lists[columnId]} index={index}/>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <AddListForm/>
        </div>
    );
};

export default Board;