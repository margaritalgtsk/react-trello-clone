import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../index";
import {ICard} from "../../types/types";

export interface IArchiveItem {
    boardId: string;
    listTitle: string;
    task: ICard;
    index: number;
}

export interface IArchiveState {
    archive: IArchiveItem[];
}

const initialState: IArchiveState = {
    archive: [
        {
            boardId: '123-123-123',
            listTitle: 'done',
            task: {
                     id: 'id-129-feed-the-capybara',
                     title: 'feed the capybara',
                     isSearchMatch: true,
                },
            index: 3
        }
    ]
};

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        addToArchiveCard: (state, action: PayloadAction<IArchiveItem>) => {
            state.archive.push(action.payload)
        },
        removeArchiveCard: (state, action: PayloadAction<string>) => {
            state.archive = state.archive.filter(item => item.task.id !== action.payload)
        }
    }
})

export const {addToArchiveCard, removeArchiveCard} = archiveSlice.actions;
export const selectArchiveCards = (state: RootState) => state.archive.archive;
export default archiveSlice.reducer;