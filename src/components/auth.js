/*
    TODO
    Create the ability to retain user login state in local storage
*/

class Auth{
    constructor(){
        this.authenticated = false;
        this.userType = '';
    }

    //Handles Login
    login(login, cb){
        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: login[0],
                password: login[1]
            })
        })
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            if(data.success){
                this.authenticated = false;
                this.userType = data.userType;
                cb(true);
            } else {
                this.authenticated = false;
                this.userType = '';
                cb(false);
            }
        });
    }


    //Returns user type
    getUserType(){
        return this.userType;
    }

    //Returns authenticated state
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();