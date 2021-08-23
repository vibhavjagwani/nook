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


export const getShuffleRoute = (p1_type: string, p2_type: string, p3_type: string, p_shuffle: string):Promise<{}> => {
    return fetch(SERVER_URL + `/get_shuffle?p1_type=${p1_type}&p2_type=${p2_type}&p3_type=${p3_type}&shuffle=${p_shuffle}`,{
        method: 'get',
        // body: JSON.stringify({p1_type, p2_type, p3_type})
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        // console.log(data);
        return data;
    }).catch(function(err) {
        console.log(err);
    });
};