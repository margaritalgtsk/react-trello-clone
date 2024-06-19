import React from 'react';
import Search from "../components/Search/Search";
import Board from "../components/Board/Board";
import {useAppSelector} from "../store/hooks";
import {selectCurrentBoard} from "../store/slices/boardSlice";
import {Link} from "react-router-dom";

const LayoutBoard = () => {

    const board = useAppSelector(selectCurrentBoard);

    if (!board) {
        return <div>Board is not selected! Follow to <Link to="/workspace">Workspace</Link></div>
    }

    const {title, lists, order, searchQuery} = board;

    return (
        <>
            <h2>{title}</h2>
            <Search searchQuery={searchQuery} />
            <Board lists={lists} order={order} />
        </>
    );
};

export default LayoutBoard;