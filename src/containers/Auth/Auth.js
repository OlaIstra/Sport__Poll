import React, { useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { checkValidaty } from '../../shared/utility'
import { map } from 'lodash'

import Button from '@material-ui/core/Button';

import InputCustom from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from "../../store/actions/index";


const Auth = props => {
    const [ controls, setControls] = useState({
        email: {
            elementType: 'text',
            value:'',
            elementConfig: {
                type:'email',
                placeholder: 'E-mail'
            },
            defaultValue: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'text',
            value:'',
            elementConfig: {
                type:'password',
                placeholder: 'Password'
            },
            defaultValue: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [ isSignUp, setIsSignUp] = useState(true)

    const dispatch = useDispatch()
    const onSetAuthRedirectPath = useCallback((path) => dispatch(actions.setAuthRedirectPath(path)), [dispatch])
    const onAuth = (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))

    const authRedirectPath = useSelector(state => {
        return state.auth.authRedirectPath
    })
    const loading = useSelector(state => {
        return state.auth.loading
    })
    const error = useSelector(state => {
        return state.auth.error
    })
    const isAuth = useSelector(state => {
        return state.auth.token !== null
    })

    useEffect(() => {
        if (authRedirectPath) {
            onSetAuthRedirectPath('/')
        }
    }, [ authRedirectPath, onSetAuthRedirectPath ])

    const inputChangedHandler = (event, controlName) => {
        const updateForm = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidaty(event.target.value, controls[controlName].validation),
                touched: true
            }
        }

        setControls(updateForm)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        onAuth(
            controls.email.value,
            controls.password.value,
            isSignUp)
    }

    const switchAuthModeHandler = () => {

        setIsSignUp(!isSignUp)
    }

    const formElements = []

    map(controls, function(val, key) {
        formElements.push({
            id: key,
            config: val
        })
    })

    let formToShow = formElements.map((el) => {
        return <InputCustom
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            touched={el.config.touched}
            shouldValidate={el.config.validation}
            changed={(event) => inputChangedHandler(event, el.id)}/>
    })

    if (loading) {
        formToShow = <Spinner />
    }

    let errorMessage = null
    if (error) {
        errorMessage = (
            <p>{error.message}</p>
        )
    }

    let authRedirect = null
    if (isAuth) {
        authRedirect = <Redirect to={authRedirectPath}/>
    }

    return (
        <>
            {authRedirect}
            {errorMessage}
            <form action="" onSubmit={submitHandler}>
                {formToShow}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitHandler}
                >
                    OK
                </Button>
            </form>
            <Button
                onClick = { switchAuthModeHandler}
                variant="contained"
                style={{ marginTop: "10px"}}
            >GO TO {isSignUp ? 'LOG IN' : 'SIGN UP'}</Button>
        </>
    )
}

export default Auth
