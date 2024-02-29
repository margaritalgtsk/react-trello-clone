import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DraggableProvided,
    DroppableProvided,
    DraggableStateSnapshot, DropResult
} from 'react-beautiful-dnd';
import AddListForm from "../AddListForm/AddListForm";
import AddCardForm from "../AddCardForm/AddCardForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {moveItem, selectItems} from "../../store/slices/boardSlice";
import {IBoardStateItem, ICard} from "../../types/types";
import _ from "lodash";
import classes from './Board.module.css';

const Board: React.FC = () => {

    const items = useAppSelector(selectItems);
    const dispatch = useAppDispatch();

    const handleDragEnd = ({destination , source}: DropResult): void => {
        if (!destination) {
            return
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }
        const itemCopy = {...items[source.droppableId].items[source.index]}
        dispatch(moveItem({destination, source, itemCopy}))
    }

    return (
        <div className={classes.boardWrapper}>
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(items, (data: IBoardStateItem, key: string) => {
                    return (
                        <div key={key} className={classes.boardColumn}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key}>
                                {(provided: DroppableProvided) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {data.items.map((el: ICard, index: number) => {
                                                return (
                                                    <Draggable key={el.id} index={index} draggableId={el.id}>
                                                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                                            const draggingClass = snapshot.isDragging ? classes.cardItemDragging : '';
                                                            return (
                                                                <div
                                                                    className={`${classes.cardItem} ${draggingClass}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {el.title}
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
                            <AddCardForm listTitle={key}/>
                        </div>
                    )
                })}
            </DragDropContext>
            <AddListForm/>
        </div>
    );
};

export default Board;