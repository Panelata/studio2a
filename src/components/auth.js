class Auth{
    constructor(){
        this.authenticated = false;
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
                cb(true);
            } else {
                cb(false);
            }
        });
    }

    //Is authenticated
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();