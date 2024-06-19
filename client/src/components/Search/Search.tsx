import React from 'react';
import {useAppDispatch} from "../../store/hooks";
import {searchCards} from "../../store/slices/boardSlice";
import {Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import classes from "./Search.module.css";

interface ISearchProps {
    searchQuery: string;
}

const Search: React.FC<ISearchProps> = ({searchQuery}) => {

    const dispatch = useAppDispatch();

    return (
        <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(searchCards(e.target.value)) }
            className={classes.searchInput}
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchQuery}
        />
    );
};

export default Search;