import userService from '../../services/userService'
import { storageService } from '../../services/storageService'
// Action Dispatcher
export function login(name) {
    return async dispatch => {
        const user = await userService.login(name)
        if (user) storageService.store('CURR_USER', user)
        dispatch({ type: 'SET_CURR_USER', user })
        return user
    }
}
export function addMove(contact, amount, currUser) {
    return async dispatch => {
        const user = await userService.addMove(contact, amount, currUser)
        console.log(user);
        const copyUser = JSON.parse(JSON.stringify(user))
        dispatch({ type: 'SET_CURR_USER', copyUser })
        return user
    }
}
export function setUser(user) {
    return async dispatch => {
        dispatch({ type: 'SET_CURR_USER', user })
    }
}



export function signup(name) {
    return async dispatch => {
        const res = await userService.signup(name)
        if (res && res !== 'username already exists') {
            storageService.store('CURR_USER', res)
            dispatch({ type: 'SET_CURR_USER', res })
        }
        return res
    }
}