import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../index";
import {ICard} from "../../types/types";

export interface IArchiveCard {
    boardId: string;
    listId: string;
    listTitle: string;
    task: ICard;
    index: number;
}
export interface IArchiveList {
    boardId: string;
    listId: string;
    title: string;
    tasks: ICard[];
    index: number;
}

interface IArchiveState {
    archive: IArchiveCard[];
    archiveLists: IArchiveList[];
}

const initialState: IArchiveState = {
    archive: [
        {
            boardId: '123-123-123',
            listTitle: 'done',
            listId: 'id-done-1',
            task: {
                    id: 'id-127-legal-review',
                    title: 'Legal review',
                    isSearchMatch: true
                },
            index: 3
        }
    ],
    archiveLists: [
        {
            boardId: '321-321-321',
            listId: 'id-bloked',
            title: 'Bloked',
            tasks: [
                    {
                        id: 'id-123-budget-approval',
                        title: 'Budget approval',
                        isSearchMatch: true
                    },
                    {
                        id: 'id-124-stakeholders',
                        title: 'Stakeholders',
                        isSearchMatch: true,
                        images: [{
                            uid: "rc-upload-1718881067288-2",
                            name: "Email_Etiquette.png"
                        }],
                        cover: {
                            uid: "rc-upload-1718881067288-2",
                            name: "Email_Etiquette.png"
                        }
                    }
            ],
            index: 3
        }
    ]
};

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        addCardToArchive: (state, action: PayloadAction<IArchiveCard>) => {
            state.archive.push(action.payload)
        },
        removeArchiveCard: (state, action: PayloadAction<string>) => {
            state.archive = state.archive.filter(item => item.task.id !== action.payload)
        },
        addListToArchive: (state, action: PayloadAction<IArchiveList>) => {
            const copyArchiveList = JSON.parse(JSON.stringify(action.payload));
            const tasksToMove = JSON.parse(JSON.stringify(state.archive.filter(item => item.listId === action.payload.listId).map(task => task.task)));
            copyArchiveList.tasks.push(...tasksToMove);
            state.archiveLists.push(copyArchiveList)
            state.archive = state.archive.filter(item => item.listId !== action.payload.listId)
        },
        removeArchiveList: (state, action: PayloadAction<string>) => {
            state.archiveLists = state.archiveLists.filter(item => item.listId !== action.payload)
        }
    }
})

export const {addCardToArchive,
    removeArchiveCard,
    addListToArchive,
    removeArchiveList} = archiveSlice.actions;
export const selectArchiveCards = (state: RootState) => state.archive.archive;
export const selectArchiveLists = (state: RootState) => state.archive.archiveLists;
export default archiveSlice.reducer;