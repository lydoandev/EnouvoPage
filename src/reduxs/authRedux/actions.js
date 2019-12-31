export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const REGISTER_SUCCESSED = "REGISTER_SUCCESSED"
export const REGISTER_FAILED = "REGISTER_FAILED"

export const LOGIN_SUCCESSED = "LOGIN_SUCCESSED"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_SUCCESSED = "LOGOUT_SUCCESSED"

export const LOGOUT = "LOGOUT"

export const login = (user) => {
  return { type: LOGIN, payload: user }
}

export const register = (user) => {
  return { type: REGISTER, payload: user }
}

export const logout = () => {
  return { type: LOGOUT }
}