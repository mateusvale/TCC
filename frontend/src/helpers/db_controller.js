import axios from 'axios';

const INICIAL_STATE = {
    login_id: -1,
    email: "Login"
}

// const baseUrl = 'http://localhost:3001/logged_user'
const baseUrl = 'https://json-server-heroku-tcc.herokuapp.com/logged_user'

export const LogOutUserDB = () => axios['put'](`${baseUrl}/1`, INICIAL_STATE);

export const LogInUserDB = (id, emailUser) => {
    const user = {
        login_id: id,
        email: emailUser
    }
    axios['put'](`${baseUrl}/1`, user);
}

// export const LoggedUserDB = () => {
//     // let user;
//     axios(baseUrl).then(resp => {
//         // console.log(resp.data)
//         return resp.data
//     })
//     // return user
// }  

// export const LoggedUserDB = () => {
//     let user;
//     user = axios(baseUrl).then(resp => {
//         user = resp.data
//     })
//     return user
// }

export async function LoggedUserDB() {
    const axios = require('axios').default;
    try {
        return await axios.get(baseUrl).then(resp => resp.data)
    } catch (error) {
        throw {
            code: error.code,
            message: error.message,
            responseStatus: error.response?.status,
            baseUrl
        };
    }
}
