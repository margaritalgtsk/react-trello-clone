import React from 'react';
import {Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided} from "react-beautiful-dnd";
import Card from "../Card/Card";
import {ICard, IListContent} from "../../types/types";
import AddCardForm from "../AddCardForm/AddCardForm";
import classes from "./Column.module.css"
import {useAppSelector} from "../../store/hooks";
import {selectSearchQuery} from "../../store/slices/boardSlice";

interface IColumnProps {
    columnId: string;
    index: number;
    column: IListContent;
}

const Column: React.FC<IColumnProps> = ({columnId, column, index}) => {

    const searchQuery = useAppSelector(selectSearchQuery);

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
                                                                        listTitle={columnId}
                                                                        cardItem={el}
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