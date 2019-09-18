import React from 'react'

import { Header } from './styled__components'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = ( props ) => (
    <Header>
        <Logo toToggleSideDrawer={props.toToggleSideDrawer}/>
        <NavigationItems
            isAuth={props.isAuth}
        />
    </Header>
)

export default toolbar
