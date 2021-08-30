class Auth{
    constructor(){
        this.authenticated = false;
    }

    //Handles Login
    login(login, cb){
        console.log("Logging in user");
        console.log(login);
        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: login[0],
                password: login[1]
            })
        });
    }

    //Is authenticated
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();