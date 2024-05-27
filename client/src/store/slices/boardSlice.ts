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
            tasks: [
                {
                    id: 'id-123-feed-the-cat',
                    title: 'feed the cat',
                    isSearchMatch: true
                },
                {
                    id: 'id-124-feed-the-dog',
                    title: 'feed the dog',
                    isSearchMatch: true,
                    images: [{
                        uid: "rc-upload-1716805931623-2",
                        name: "dog.jpg"
                    }],
                    cover: {
                        uid: "rc-upload-1716805931623-2",
                        name: "dog.jpg"
                    }
                }
            ]
        },
        'in-progress': {
            title: 'In Progress',
            tasks: [
                {
                    id: 'id-125-feed-the-parrot',
                    title: 'feed the parrot',
                    isSearchMatch: true
                },
                {
                    id: 'id-126-feed-the-turtle',
                    title: 'feed the turtle',
                    isSearchMatch: true
                },
                {
                    id: 'id-128-feed-the-capybara',
                    title: 'feed the capybara',
                    isSearchMatch: true
                }
            ]
        },
        'done': {
            title: 'Completed',
            tasks: [
                {
                    id: 'id-127-feed-the-mouse',
                    title: 'feed the mouse',
                    isSearchMatch: true
                },
                {
                    id: 'id-129-feed-the-dingo',
                    title: 'feed the dingo',
                    isSearchMatch: true
                }
            ]
        }
    },
    order: ['todo', 'in-progress', 'done'],
    searchQuery: ''
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
            console.log(action.payload)
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
        },
        searchCards: (state, action: PayloadAction<string>) => {
           state.searchQuery = action.payload;
           Object.values(state.lists).forEach((list) => {
               list.tasks = list.tasks.map(task => ({
                   ...task,
                   isSearchMatch: task.title.toLowerCase().includes(action.payload.toLowerCase())
               }));
           });
        },
    },
})

export const { addList,
    addCard,
    moveCard,
    editCard,
    addImage,
    removeImage,
    setCoverImage,
    reorderLists,
    searchCards} = boardSlice.actions;
export const selectLists = (state: RootState) => state.board.lists;
export const selectOrder = (state: RootState) => state.board.order;
export const selectSearchQuery = (state: RootState) => state.board.searchQuery;
export default boardSlice.reducer;