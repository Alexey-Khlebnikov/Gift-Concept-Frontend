import EventEmitter from 'events';
import userApi from '@/api/user'

// 'loggedIn' is used in other parts of application. So, Don't forget to change there also
const localStorageKey = 'loggedIn';

const tokenExpiryKey = 'tokenExpiry';
const loginEvent = 'loginEvent';


class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;
  timer = null

  // Starts the user login flow
  login({ email, password }) {
    return userApi.login({ email, password })
      .then((authResult) => {
        this.localLogin(authResult);
        return authResult
      })
  }

  localLogin(authResult) {
    console.log(authResult);
    this.profile = authResult.payload;
    let expiredCycle = this.profile.expireCycle * 1000 * 60;
    if(this.timer) clearInterval(this.timer);
    this.timer = setTimeout(() => {
      this.timer = null
      this.logOut();
    }, expiredCycle);
    this.tokenExpiry = Date.now() + expiredCycle;
    localStorage.setItem(tokenExpiryKey, this.tokenExpiry);
    localStorage.setItem(localStorageKey, 'true');
    this.updateUserData(this.profile);

    this.emit(loginEvent, {
      loggedIn: true,
      profile: this.profile,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    userApi.renewTokens().then(authResult => {
      if (authResult)
        this.localLogin(authResult);
    })
      .catch(error => {
        if (error.code == 'Token Expired') {
          this.logOut(false);
        }
      })
  }

  logOut(autoLogout = false) {
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem(tokenExpiryKey);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userRole');

    this.tokenExpiry = null;
    this.profile = null;

    if (!autoLogout)
      userApi.logOut();

    this.emit(loginEvent, { loggedIn: false, autoLogout });
  }

  get isAuthenticated() {
    return (
      Date.now() < parseInt(localStorage.getItem(tokenExpiryKey)) &&
      localStorage.getItem(localStorageKey) === 'true'
    );
  }

  get isActivated() {
    return this.Me && this.Me.activated == 'allow'
  }

  get Me() {
    if (!this.isAuthenticated) return null
    let json = localStorage.getItem('userInfo')
    return JSON.parse(json)
  }

  get userRole() {
    return localStorage.getItem('userRole');
  }

  currentUser() {
    if (!this.isAuthenticated) return null
    let json = localStorage.getItem('userInfo')
    return JSON.parse(json)
  }
  updateUserData(user) {
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
}

export default new AuthService();
