import { storageService } from './storageService'

export default {
    query,
    signup,
    login,
    addMove
}

const users = [
    { name: "nadav", coins: 100, moves: [] }
]

function query() {
    return users
}

function login(name) {
    const user = users.find(user => user.name === name)
    return Promise.resolve(user)
}

function signup(name) {
    const user = users.find(user => user.name === name)
    if(user) return Promise.resolve('username already exists')
    users.push({ name, coins: 100, moves: [] })
    return Promise.resolve({ name, coins: 100, moves: [] })
}

function addMove(contact, amount, currUser) {
    const currUserIdx = users.findIndex(user => user.name === currUser.name)
    if (currUserIdx === -1) return
    const updatedUser = JSON.parse(JSON.stringify(users[currUserIdx]))
    updatedUser.coins -= amount
    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    updatedUser.moves.push(move)
    users.splice(currUserIdx,1,updatedUser)
    storageService.store('CURR_USER', updatedUser)
    return updatedUser
}