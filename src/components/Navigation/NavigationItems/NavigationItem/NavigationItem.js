import React from 'react'

import { NavLink } from "react-router-dom";
import { NavLI } from "./styled__components";

const navigationItem = ( props ) => (
    <NavLI>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName='active'
        >{props.children}</NavLink>
    </NavLI>
)

export default navigationItem
