import {API} from '../config';


export const signUp = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json" 
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const signIn = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json" 
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const authenticate = (data, next) => {
    if(typeof window !=='undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined'){
        return false;
    }

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else{
        return false;
    }
}

export const signOut = (next) => {
    if(typeof window !=='undefined'){
        localStorage.removeItem('jwt');
        next();

        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(res => console.log("Signout Response: ", res))
        .catch(err => console.log("Error: ", err));
    }
}
