import React, {useState} from 'react';
import Search from "../../components/Search/Search";
import Board from "../../components/Board/Board";
import BoardMenu from "../../components/BoardMenu/BoardMenu";
import HeaderBoard from "../../components/HeaderBoard/HeaderBoard";
import {useAppSelector} from "../../store/hooks";
import {selectCurrentBoard} from "../../store/slices/boardSlice";
import {Link} from "react-router-dom";
import classes from "./LayoutBoard.module.css";

const LayoutBoard = () => {

    const [isBoardMenu, setIsBoardMenu] = useState<boolean>(false);
    const board = useAppSelector(selectCurrentBoard);

    if (!board) {
       return <div>Board is not selected! Follow to <Link to="/workspace">Workspace</Link></div> //check
    }

    const {title, lists, order, searchQuery} = board;

    return (
        <>
        <HeaderBoard title={title} isBoardMenu={isBoardMenu} setIsBoardMenu={setIsBoardMenu}/>
            <main className={classes.main}>
                <Search searchQuery={searchQuery} />
                <Board lists={lists} order={order} />
                {isBoardMenu && <BoardMenu/>}
            </main>
        </>
    );
};

export default LayoutBoard;