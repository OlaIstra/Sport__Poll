import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Main } from './styled__components'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {

    const [ showSideDrawer, setShowSideDrawer ] = useState(false)

    const isLogin = useSelector(state => {
        return state.auth.token !== null
    })

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const toToggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return(
        <>
            <Toolbar
                toToggleSideDrawer={toToggleSideDrawer}
                isAuth={isLogin}
            />
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                toToggleSideDrawer={toToggleSideDrawer}
                isAuth={isLogin}
            />
            <Main>
                {props.children}
            </Main>
        </>
    )
}


export default Layout
