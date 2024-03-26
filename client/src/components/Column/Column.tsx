import React from 'react';
import {Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided} from "react-beautiful-dnd";
import Card from "../Card/Card";
import {IBoardStateItem, ICard} from "../../types/types";
import AddCardForm from "../AddCardForm/AddCardForm";
import classes from "./Column.module.css"

interface IColumnProps {
    columnId: string;
    column: IBoardStateItem;
    index: number;
}

const Column: React.FC<IColumnProps> = ({columnId, column, index}) => {

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
                        <h3  {...provided.dragHandleProps}>{column.title}</h3>
                        <Droppable droppableId={columnId} type="task">
                            {(provided: DroppableProvided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {column.tasks.map((el: ICard, index: number) => {
                                            return (
                                                <Draggable key={el.id} index={index} draggableId={el.id}>
                                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                                        const draggingCardClass = snapshot.isDragging ? classes.cardItemDragging : '';
                                                        return (
                                                            <div
                                                                className={`${classes.cardItem} ${draggingCardClass}`}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Card
                                                                    id={el.id}
                                                                    list={columnId}
                                                                    title={el.title}
                                                                    description={el.description}
                                                                    images={el.images}
                                                                />
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