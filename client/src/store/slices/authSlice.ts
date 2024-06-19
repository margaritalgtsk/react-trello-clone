import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {MyData, userLogin, userRegister} from "../../asyncActions/authAction";

export interface IAuthState {
    loading: boolean;
    userInfo: string | null;
    userToken: string;
    error?: string;
    success: boolean;
}

const initialState: IAuthState = {
    loading: false,
    userInfo: null,
    userToken: localStorage.getItem('userToken') ?? "",
    error: "",
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken')
            state.userInfo = null
            state.userToken = ""
            state.error = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = ""
        })
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<MyData>) => {
            state.loading = false;
            state.userToken = action.payload.token
            state.userInfo = action.payload.message
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = ""
        })
        builder.addCase(userRegister.fulfilled, (state, action: PayloadAction<MyData>) => {
            state.loading = false;
            state.userToken = action.payload.token
            state.success = true;
        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export const {logout} = authSlice.actions

export default authSlice.reducer