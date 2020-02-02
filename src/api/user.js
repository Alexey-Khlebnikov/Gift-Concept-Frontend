import Parent from '.'

class API extends Parent {
  login({ email, password }) {
    return this.post('/login', { email, password });
  }
  rememberMe() {
    return this.post('/rememberMe');
  }
  renewTokens() {
    return this.post('/renewTokens');
  }
  logOut() {
    return this.post('/logout');
  }
}

export default new API("users");
