import React, { useEffect, Suspense, useCallback } from 'react';
import './App.css';

import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import * as actions from './store/actions/index'

import Layout from './containers/Layout/Layout'
import MakeBet from './containers/MakeBet/MakeBet'
import Logout from './containers/Auth/Logout/Logout'


const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth')
})

const Polls = React.lazy(() => {
    return import('./containers/Polls/Polls')
})


const App = props => {

    const dispatch = useDispatch()
    const onTryAutoSignUp = useCallback(() => dispatch(actions.checkAuthStatus()), [dispatch])

    const isAuth = useSelector( state => {
        return state.auth.token !== null
    })

    useEffect(() => {
        onTryAutoSignUp()
    }, [onTryAutoSignUp])

    let routes = (
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' exact component={MakeBet}/>
            <Redirect to='/' />
        </Switch>
    )

    if (isAuth) {
        routes = (
            <Switch>
                <Route path='/logout' component={Logout} />
                <Route path='/my__polls' render={(props) => <Polls {...props}/>} />
                <Route path='/auth' component={Auth} />
                <Route path='/' exact component={MakeBet}/>
                <Redirect to='/' />
            </Switch>
        )
    }

    return (
        <Layout >
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
    );

}

export default withRouter(App);
