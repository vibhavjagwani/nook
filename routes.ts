import { SERVER_URL } from '@env'; 

export const loginRoute = (username: string, password: string) => {
    fetch(SERVER_URL + "/login",{
        method: 'post',
        body: JSON.stringify({username, password})
    }).then(function(response) {
        console.log(response.json());
        return 1;
    }).then(function(data) {
        console.log('login');
        console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
    return -1
}

export const signupRoute = (username: string, password: string) => {
    fetch(SERVER_URL + "/signup",{
        method: 'post',
        body: JSON.stringify({username, password})
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
};