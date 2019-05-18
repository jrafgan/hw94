import React from 'react';
import {NavLink} from "react-router-dom";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const Layout = ({user, logout}) => {

    return (
        <div className="main_nav">
            <div><NavLink to="/" exact>Главная</NavLink></div>
            {user ?
                <UserMenu user={user} logout={logout}/> : <AnonymousMenu/>}
            <h2 className="h2">First.FM</h2>
        </div>
    )
};


export default Layout;