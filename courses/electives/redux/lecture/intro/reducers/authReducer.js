const initialState = { authenticated: false, user: null }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, authenticated: true, user: action.user }
    case 'LOGOUT':
      return { ...initialState }
    default:
      return state
  }
}

export default authReducer
