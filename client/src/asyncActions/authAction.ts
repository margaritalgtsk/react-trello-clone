import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch} from "../store";
import {setError} from "../store/slices/errorSlice";

export interface MyData {
    message: string;
    token: string
}

interface ILoginParams {
    username?: string;
    password?: string
}

export const userLogin = createAsyncThunk<
    MyData,
    ILoginParams,
    {
        dispatch: AppDispatch;
        rejectValue: string;
    }
>(
    'auth/login',
    async ({username, password}, {dispatch, rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const response = await axios.post(
                `http://localhost:8080/auth`,
                { username, password },
                config
            )
            localStorage.setItem('userToken', response.data.token)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = error.response?.data.message?? error.message;
                dispatch(setError({message: `Auth error! ${errorMessage}!`,type: 'error' }));
                return rejectWithValue(errorMessage);
            }
        }
    }
)

export const userRegister = createAsyncThunk<
    MyData,
    ILoginParams,
    {
        dispatch: AppDispatch;
        rejectValue: string;
    }
>(
    'auth/register',
    async ({username, password}, {dispatch, rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const response = await axios.post(
                `http://localhost:8080/register`,
                { username, password },
                config
            )
            localStorage.setItem('userToken', response.data.token)
            dispatch(setError({message: 'Successful registration', type: 'success'}))
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = error.response?.data.message?? error.message;
                dispatch(setError({message: `Registration error! ${errorMessage}!`, type: 'error'}));
                return rejectWithValue(errorMessage);
            }
        }
    }
)