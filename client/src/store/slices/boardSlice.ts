import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {IBoardState, ICard, IDraggableProps, IEditFormValues} from "../../types/types";
import {RootState} from "../index";
import {UploadFile} from "antd";

interface IAddListActionPayload {
    id: string;
    title: string;
}

interface IAddCardActionPayload {
    cardItem: ICard;
    listTitle: string;
}

interface IMoveCardActionPayload {
    source: IDraggableProps;
    destination: IDraggableProps;
    cardCopy: ICard;
}

interface IEditItemActionPayload {
    id: string;
    list: string;
    values: IEditFormValues;
}

interface IAddImageActionPayload {
    id: string;
    list: string;
    file: UploadFile;
}
interface IRemoveImageActionPayload {
    id: string;
    list: string;
    imageId: string;
}
interface ISetCoverImageActionPayload {
    id: string;
    list: string;
    image: UploadFile | undefined;
}

const initialState: IBoardState = {
    lists : {
        'todo': {
            title: 'Todo',
            tasks: [{
                id: 'id-123-feed-the-cat',
                title: 'feed the cat'
            }]
        },
        'in-progress': {
            title: 'In Progress',
            tasks: []
        },
        'done': {
            title: 'Completed',
            tasks: []
        }
    },
    order: ['todo', 'in-progress', 'done']
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<IAddListActionPayload>) => {
            const {id, title} = action.payload
            state.lists[id] = {title, tasks: []}
            state.order.push(id)
        },
        addCard: (state, action: PayloadAction<IAddCardActionPayload>) => {
            state.lists[action.payload.listTitle].tasks.push(action.payload.cardItem)
        },
        moveCard: (state, action: PayloadAction<IMoveCardActionPayload>) => {
            state.lists[action.payload.source.droppableId].tasks.splice(action.payload.source.index, 1)
            state.lists[action.payload.destination.droppableId].tasks.splice(action.payload.destination.index, 0, action.payload.cardCopy)
        },
        editCard: (state, action: PayloadAction<IEditItemActionPayload>) => {
            state.lists[action.payload.list].tasks.forEach((task: ICard): void => {
                if(task.id === action.payload.id) {
                    if(task.title !== action.payload.values.title) {
                        task.title = action.payload.values.title
                    }
                    if(task.description !== action.payload.values.description) {
                        task.description = action.payload.values.description
                    }
                }
            })
        },
        addImage: (state, action: PayloadAction<IAddImageActionPayload>) => {
            state.lists[action.payload.list].tasks.forEach((task: ICard): void => {
                if(task.id === action.payload.id) {
                    if(typeof task.images === "undefined") {
                        task.images = [];
                    }
                    task.images.push(action.payload.file)
                }
            })
        },
        removeImage: (state, action: PayloadAction<IRemoveImageActionPayload>) => {
            state.lists[action.payload.list].tasks.forEach((task: ICard): void => {
                if(task.id === action.payload.id) {
                    task.images = task.images?.filter(image => image.uid !== action.payload.imageId)
                    if(task.cover?.uid === action.payload.imageId) {
                        task.cover = undefined
                    }
                }
            })
        },
        setCoverImage: (state, action: PayloadAction<ISetCoverImageActionPayload>) => {
            state.lists[action.payload.list].tasks.forEach((task: ICard): void => {
                if(task.id === action.payload.id) {
                    task.cover = action.payload.image
                }
            })
        },
        reorderLists: (state, action: PayloadAction<string[]>) => {
            state.order = action.payload;
        }
    },
})

export const { addList, addCard, moveCard, editCard, addImage, removeImage, setCoverImage, reorderLists} = boardSlice.actions;
export const selectLists = (state: RootState) => state.board.lists;
export const selectOrder = (state: RootState) => state.board.order;
export default boardSlice.reducer;