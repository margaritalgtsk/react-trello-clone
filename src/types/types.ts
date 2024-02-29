export interface ICard {
    id: string;
    title: string;
}
export interface IBoardStateItem {
    title: string;
    items: ICard[];
}
export interface IBoardState {
    [key: string]: IBoardStateItem;
}

export interface IDraggableProps {
    droppableId: string;
    index: number;
}