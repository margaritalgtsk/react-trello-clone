import {combineReducers} from "redux";
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import persistConfig from "./persistConfig";
import errorSlice from "./slices/errorSlice";
import boardSlice from "./slices/boardSlice";
import authSlice from "./slices/authSlice";
import archiveSlice from "./slices/archiveSlice";


const rootReducer = combineReducers({
    error: errorSlice,
    board: boardSlice,
    auth: authSlice,
    archive: archiveSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['board/addImage', 'board/moveCard', 'board/setCoverImage', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['board']
            }
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;