import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {IBoardState, ICard, IDraggableProps, IEditFormValues} from "../../types/types";
import {RootState} from "../index";

interface IAddItemActionPayload {
    item: ICard;
    listTitle: string;
}
interface IMoveItemActionPayload {
    source: IDraggableProps;
    destination: IDraggableProps;
    itemCopy: ICard;
}
interface IEditItemActionPayload {
    id: string;
    list: string;
    values: IEditFormValues;
}

const initialState: IBoardState = {
    "todo": {
        title: "Todo",
        items: []
    },
    "in-progress": {
        title: "In Progress",
        items: []
    },
    "done": {
        title: "Completed",
        items: []
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                [action.payload] : {
                    title: action.payload,
                    items: []
                }
            }
        },
        addItem: (state, action: PayloadAction<IAddItemActionPayload>) => {
            state[action.payload.listTitle].items.push(action.payload.item)
        },
        moveItem: (state, action: PayloadAction<IMoveItemActionPayload>) => {
            state[action.payload.source.droppableId].items.splice(action.payload.source.index, 1)
            state[action.payload.destination.droppableId].items.splice(action.payload.destination.index, 0, action.payload.itemCopy)
        },
        editItem: (state, action: PayloadAction<IEditItemActionPayload>) => {
            state[action.payload.list].items.map((item) => {
                if(item.id === action.payload.id) {
                    if(item.title !== action.payload.values.title) {
                        item.title = action.payload.values.title
                    }
                    if(item.description !== action.payload.values.description) {
                        item.description = action.payload.values.description
                    }
                    item.images = action.payload.values.images;
                }
                return item;
            })
        }
    },
})

export const { addList, addItem, moveItem, editItem} = boardSlice.actions;
export const selectItems = (state: RootState) => state.board;
export default boardSlice.reducer;