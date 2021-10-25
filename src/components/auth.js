/*
    TODO
    Create the ability to retain user login state in local storage
*/

class Auth {
  constructor() {
    this.authenticated = false;
    this.userType = "";
  }

  //Handles Login
  login(login, cb) {
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      body: JSON.stringify({
        username: login[0],
        password: login[1],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          this.authenticated = true;
          this.userType = data.userType;
          sessionStorage.setItem("sessionToken", data.token);
          if (login[2]) {
            localStorage.setItem("token", data.token);
          }
          cb(true);
        } else {
          this.authenticated = false;
          this.userType = "";
          cb(false);
        }
      });
  }

  //Register new user
  register(userDetails, cb) {
    fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: userDetails[0],
        lastName: userDetails[1],
        email: userDetails[2],
        username: userDetails[3],
        password: userDetails[4],
        userType: userDetails[5],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          cb(true);
        } else {
          cb(false, data.message);
        }
      });
  }

  logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    this.authenticated = false;
    this.userType = false;
  }

  //Returns user type
  getUserType() {
    return this.userType;
  }

  getUserID() {
    return this.userID;
  }

  //Returns authenticated state
  isAuthenticated() {
    return this.authenticated;
  }

  //Token authenticated
  tokenAuthenticated(userType) {
    this.authenticated = true;
    this.userType = userType;
  }
}

export default new Auth();
