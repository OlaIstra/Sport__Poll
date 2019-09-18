import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should store the token upon login', () => {
        expect(reducer({
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {type: actionTypes.AUTH_SUCCESS,
                    userId: 'smth'
        })).toEqual({
            userId: 'smth',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

})
