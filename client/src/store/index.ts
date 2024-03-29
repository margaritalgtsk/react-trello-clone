import { configureStore } from '@reduxjs/toolkit'
import errorSlice from "./slices/errorSlice";
import boardSlice from "./slices/boardSlice";

export const store = configureStore({
    reducer: {
        error: errorSlice,
        board: boardSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['board/editCard', 'board/moveCard'],
                ignoredPaths: ['board']
            }
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;