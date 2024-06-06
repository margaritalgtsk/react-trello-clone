import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../index";
import {ICardExtended} from "../../types/types";

interface IArchiveState {
    archive: ICardExtended[];
}

const initialState: IArchiveState = {
    archive: [
        {   index: 3,
            listTitle: 'done',
            cardItem: {
                id: 'id-129-feed-the-capybara',
                title: 'feed the capybara',
                isSearchMatch: true
            }
        }
    ]
};

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        addArchiveCard: (state, action: PayloadAction<ICardExtended>) => {
            state.archive.push(action.payload)
        },
        removeArchiveCard: (state, action: PayloadAction<string>) => {
            state.archive = state.archive.filter(task => task.cardItem.id !== action.payload)
        }
    }
})

export const {addArchiveCard, removeArchiveCard} = archiveSlice.actions;
export const selectArchiveCards = (state: RootState) => state.archive.archive;
export default archiveSlice.reducer;