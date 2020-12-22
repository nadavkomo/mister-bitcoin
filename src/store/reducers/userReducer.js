const INITIAL_STATE = {
  currUser: null
}
export function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'SET_CURR_USER':
      return {
        ...state,
        currUser: action.user
      }
      break;

    default:
      return state
  }
}