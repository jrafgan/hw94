import React from 'react';
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => (
    <div className="anonymous_menu">
        <div>
            <NavLink to="/register" exact>Регистрация</NavLink>
        </div>

        <div>
            <NavLink to="/login" exact>Войти</NavLink>
        </div>
    </div>
);

export default AnonymousMenu;