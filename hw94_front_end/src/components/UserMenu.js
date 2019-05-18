import React from 'react';
import {NavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {

    return (
        <div className="user_menu">
            <div>
                Привет, {user.username}!
            </div>
            {user.username === 'admin' ? <NavLink to="/admin_office/" exact>Админ офис</NavLink> : null}
            <NavLink to="/add_artist" exact>Добавить исполнителя</NavLink>
            <NavLink to="/add_album" exact>Добавить альбом</NavLink>
            <NavLink to="/add_track" exact>Добавить трэк</NavLink>
            <NavLink to="/track_history" exact>Прослушанные трэки</NavLink>
            <NavLink onClick={logout} to="/" exact>Выйти</NavLink>
        </div>)
};

export default UserMenu;