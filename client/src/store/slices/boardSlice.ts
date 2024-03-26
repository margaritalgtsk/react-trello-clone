import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {IBoardState, ICard, IDraggableProps, IEditFormValues} from "../../types/types";
import {RootState} from "../index";

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
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.payload.id] : {
                        title: action.payload.title,
                        tasks: []
                    }
                },
                order: [
                    ...state.order,
                    action.payload.id
                ]
            }
        },
        addCard: (state, action: PayloadAction<IAddCardActionPayload>) => {
            state.lists[action.payload.listTitle].tasks.push(action.payload.cardItem)
        },
        moveCard: (state, action: PayloadAction<IMoveCardActionPayload>) => {
            state.lists[action.payload.source.droppableId].tasks.splice(action.payload.source.index, 1)
            state.lists[action.payload.destination.droppableId].tasks.splice(action.payload.destination.index, 0, action.payload.cardCopy)
        },
        editCard: (state, action: PayloadAction<IEditItemActionPayload>) => {
            state.lists[action.payload.list].tasks.map((task) => {
                if(task.id === action.payload.id) {
                    if(task.title !== action.payload.values.title) {
                        task.title = action.payload.values.title
                    }
                    if(task.description !== action.payload.values.description) {
                        task.description = action.payload.values.description
                    }
                    task.images = action.payload.values.images;
                }
                return task;
            })
        },
        reorderLists: (state, action: PayloadAction<string[]>) => {
            state.order = action.payload;
        }
    },
})

export const { addList, addCard, moveCard, editCard, reorderLists} = boardSlice.actions;
export const selectLists = (state: RootState) => state.board.lists;
export const selectOrder = (state: RootState) => state.board.order;
export default boardSlice.reducer;