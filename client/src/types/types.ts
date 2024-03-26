import {UploadFile} from "antd";

export interface ICard {
    id: string;
    title: string;
    description?: string;
    images?: UploadFile[];
}
export interface IBoardStateItem {
    title: string;
    tasks: ICard[];
}
export interface IBoardState {
    lists: {
        [key: string]: IBoardStateItem;
    };
    order: string[];

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