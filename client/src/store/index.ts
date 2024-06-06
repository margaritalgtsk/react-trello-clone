import { configureStore } from '@reduxjs/toolkit'
import errorSlice from "./slices/errorSlice";
import boardSlice from "./slices/boardSlice";
import authSlice from "./slices/authSlice";
import archiveSlice from "./slices/archiveSlice";

export const store = configureStore({
    reducer: {
        error: errorSlice,
        board: boardSlice,
        auth: authSlice,
        archive: archiveSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['board/addImage', 'board/moveCard', 'board/setCoverImage'],
                ignoredPaths: ['board']
            }
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;