import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {MyData, userLogin} from "../../asyncActions/authAction";
import {RootState} from "../index";

interface IAuthState {
    userInfo: string | null;
    userToken: string;
    error?: string;
}

const initialState: IAuthState = {
    userInfo: null,
    userToken: localStorage.getItem('userToken') ?? "",
    error: "",
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
            state.error = ""
        })
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<MyData>) => {
            state.userToken = action.payload.token
            state.userInfo = action.payload.message
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.error = action.payload;
        })
    },
})

export const { logout } = authSlice.actions
export const selectUserLogin = (state: RootState) => state.auth.userInfo;
export default authSlice.reducer