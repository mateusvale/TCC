import axios from 'axios';

const INICIAL_STATE = {
    login_id: -1,
    email: "Login"
}

// const baseUrl = 'http://localhost:3001/logged'
// const logoutUrl = 'http://localhost:3001/logout'
// const logintUrl = 'http://localhost:3001/login'
const baseUrl = 'https://db-postgress-tcc.herokuapp.com/logged'
const logoutUrl = 'https://db-postgress-tcc.herokuapp.com/logout'
const logintUrl = 'https://db-postgress-tcc.herokuapp.com/login'

export const LogOutUserDB = () =>  axios['put'](`${logoutUrl}`);

export const LogInUserDB = (id, emailUser) => {
    const user = {
        login_id: id,
        email: emailUser
    }
    axios['put'](`${logintUrl}/${id}`);
}

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
