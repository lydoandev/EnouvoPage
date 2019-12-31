
import * as Type from './actions'

var initialState = {
  user: {},
  logingIn: false,
  isAuthenticated: false,
  loading: false,
  error: '',
  tasks: [],
  signingUp: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASKS_SUCCESSED":
      console.log("Data when success: ", action.payload)
      return Object.assign({}, state, { tasks: action.payload })
    case Type.LOGIN:
      return Object.assign({}, state, {
        logingIn: true,
        isAuthenticated: false,
        loading: true,
        error: ''
      });
    case Type.LOGIN_SUCCESSED:
      return Object.assign({}, state, {
        logingIn: false,
        isAuthenticated: true,
        user: action.payload.data,
        loading: false,
        error: ''
      });
    case Type.LOGIN_FAILED:
      return Object.assign({}, state, {
        logingIn: false,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      });
    case Type.REGISTER:
      return Object.assign({}, state, {
        loading: true,
        signingUp: false,
        error: ''
      });
    case Type.REGISTER_SUCCESSED:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: true,
        user: action.payload.data,
        signingUp: false,
        error: ''
      });
    case Type.REGISTER_FAILED:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false,
        signingUp: false,
        error: action.payload
      });
    case Type.LOGOUT:
      return Object.assign({}, state, {
        loading: true
      })
    case Type.LOGOUT_SUCCESSED:
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: false
      })
    default: return state;
  }
};
export default authReducer;