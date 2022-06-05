import './Header.css'
import React from 'react'

import { connect } from "react-redux";
import axios from 'axios';
// import { LoggedUserDB } from "../../helpers/db_controller"

function logout(){
    return {
        type: 'LOGOUT_USER'
    }
}
// function AuthenticateLogin(id, email) { 
//     return {
//         type: 'AUTHENTICATE_LOGIN',
//         id,
//         email
//     }
// }


const baseUrl = 'http://localhost:3001/logged_user'

const Header = ({ props, login, dispatch}) => {
    

    // let loggedUser;
    // axios(baseUrl).then(resp => {
    //     loggedUser = {
    //         login_id: resp.data.login_id,
    //         email: resp.data.email
    //     }
    // })

    // if (loggedUser.login_id != -1){
    //     AuthenticateLogin(loggedUser.login_id, loggedUser.email)
    // }

    return (
        <header className='header d-none d-sm-flex flex-column'>
            <div>
                <div>
                    <div className='d-flex justify-content-between'>
                        <h1 className="mt-3 justify-content-start">
                            <i className={`fa fa-${login.icon}`}></i> {login.title}
                            {/* <i className='fa fa-login.icon'></i> props.title */}
                        </h1>
                        <label className='mt-2'><i className={`fa fa-user `}></i>{login.email}</label>
                    </div>
                        <p className='lead text-muted'>{login.subtitle}</p>
                        <label className='d-flex justify-content-end mb-5' onClick={() => dispatch(logout())}>Sair</label>
                </div>
                
            </div>
        </header>
    )
}

export default connect(state => ({login: state}))(Header)