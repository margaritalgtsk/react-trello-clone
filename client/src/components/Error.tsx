import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {clearError, selectErrorMessage} from "../store/slices/errorSlice";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error: React.FC = () => {

    const errorMessage = useAppSelector(selectErrorMessage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(errorMessage.type === 'success') {
            toast.success(errorMessage.message);
        } else if (errorMessage.type === 'error') {
            toast.error(errorMessage.message);
        }
        dispatch(clearError())
    }, [errorMessage.message, dispatch]);

    return (
            <ToastContainer />
    );
};

export default Error;