import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IBoardState, ICard, IDraggableProps} from "../../types/types";
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
        }
    },
})

export const { addList, addItem, moveItem} = boardSlice.actions;
export const selectItems = (state: RootState) => state.board;
export default boardSlice.reducer;