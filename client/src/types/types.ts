import {UploadFile} from "antd";

export interface ICard {
    id: string;
    title: string;
    description?: string;
    images?: UploadFile[];
    cover?: UploadFile;
    isSearchMatch: boolean;
}

export interface IListContent {
    title: string;
    tasks: ICard[];
}

export interface IList {
    [key: string]: IListContent;
}

export interface IBoardState {
    current: boolean;
    id: string;
    title: string;
    lists: IList;
    order: string[];
    searchQuery: string;
}

export interface IDraggableProps {
    droppableId: string;
    index: number;
}

export interface IEditFormValues {
    title: string;
    description: string;
}