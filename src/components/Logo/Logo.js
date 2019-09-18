import React from 'react'

import logoPoll from "../../assets/img/logo.png"
import { Logo, LogoImg } from './styled__components'

const logo = ( props ) => (
    <Logo>
        <LogoImg src={logoPoll} alt="burger" onClick={props.toToggleSideDrawer}/>
    </Logo>
)

export default logo
