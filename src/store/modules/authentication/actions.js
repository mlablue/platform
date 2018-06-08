import Login from '../../../api/login'

export const login = ({ commit, state }, connectionPayload) => {
  return new Promise((resolve, reject) => {
    Login.getToken(connectionPayload).then(
      accessToken => {
        localStorage.setItem('token', accessToken)
        commit('LOGIN', null, {root: true})
        resolve()
      },
      err => {
        reject(err)
      }
    )
  })
}

export const setAuthenticated = ({commit, state}) => {
  commit('LOGIN', null, {root: true})
}