import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import classes from "./HeaderBoard.module.css";

interface IHeaderBoardProps {
    title: string;
    isBoardMenu: boolean;
    setIsBoardMenu: (value: boolean) => void;
}
const HeaderBoard: React.FC<IHeaderBoardProps> = ({title, isBoardMenu, setIsBoardMenu}) => {

    const navigate = useNavigate();

    return (
        <div className={classes.header}>
            <Button onClick={() => navigate(-1)}>Return</Button>
            <div className={classes.title}>{title}</div>
            <Button onClick={() => setIsBoardMenu(!isBoardMenu)}>{isBoardMenu ? 'Close' : 'Menu'}</Button>
        </div>
    );
};

export default HeaderBoard;