import React from 'react'

import { NavUL } from "./styled__components";
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = ( props ) => (
    <NavUL>
        <NavigationItem link='/' exact>Make a Bet</NavigationItem>
        {props.isAuth ? <NavigationItem link='/my__polls'>My Polls</NavigationItem> : null}
        {props.isAuth ?
            <NavigationItem link='/logout'>Log out</NavigationItem>
            : <NavigationItem link='/auth'>Authentication</NavigationItem>
        }
    </NavUL>
)
export default navigationItems
