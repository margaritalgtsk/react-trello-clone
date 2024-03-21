import {UploadFile} from "antd";

export interface ICard {
    id: string;
    title: string;
    description?: string;
    images?: UploadFile[];
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

export interface IEditFormValues {
    title: string;
    description: string;
    images?: UploadFile[];
}