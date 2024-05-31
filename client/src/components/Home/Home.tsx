import React, {useState} from 'react';
import Login from "../Login/Login";
import Register from "../Register/Register";

const Home = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleClick = (value: boolean) => {
        setIsLogin(value)
    }

    return (
        <div>
            <h1>Welcome to Trello Clone!</h1>
            {isLogin ? <Login handleClick={handleClick} /> : <Register handleClick={handleClick}/>}
        </div>
    );
};

export default Home;