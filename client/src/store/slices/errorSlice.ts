import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../index";

interface IErrorState {
    message: string;
    type: string;
}

const initialState: IErrorState = {
    message: '',
    type: ''
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<IErrorState>) => {
            return action.payload
        },
        clearError: () => {
            return initialState
        }
    },
})

export const {setError, clearError} = errorSlice.actions;
export const selectErrorMessage = (state: RootState) => state.error;
export default errorSlice.reducer;