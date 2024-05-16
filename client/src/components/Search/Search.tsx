import React from 'react';
import Board from "../Board/Board";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {searchCards, selectLists} from "../../store/slices/boardSlice";
import {Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import classes from "./Search.module.css";

const Search = () => {

    const lists = useAppSelector(selectLists);
    const dispatch = useAppDispatch();

    return (
        <div>
            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(searchCards(e.target.value)) }
                className={classes.searchInput}
                placeholder="Search"
                prefix={<SearchOutlined />} />
            <Board lists={lists}/>
        </div>
    );
};

export default Search;