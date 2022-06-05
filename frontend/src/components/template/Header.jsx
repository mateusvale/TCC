import './Header.css'
import React from 'react'
import { useEffect } from 'react';

import { connect } from "react-redux";
import axios from 'axios';

function logout(){
    return {
        type: 'LOGOUT_USER'
    }
}
function AuthenticateLogin(id, email) { 
    return {
        type: 'AUTHENTICATE_LOGIN',
        id,
        email
    }
}

const baseUrl = 'http://localhost:3001/logged_user'

const Header = ({ login, dispatch}) => {
    
    useEffect(() => {
        
    let loggedUser;
    axios(baseUrl).then(resp => {
        loggedUser = {
            login_id: resp.data[0].login_id,
            email: resp.data[0].email
        }
        if (loggedUser.login_id != -1){
            dispatch(AuthenticateLogin(loggedUser.login_id, loggedUser.email))
        }
    })
    }, []) // ',[]' to avoid loop

    return (
        <header className='header d-none d-sm-flex flex-column'>
            <div>
                <div>
                    <div className='d-flex justify-content-between'>
                        <h1 className="mt-3 justify-content-start">
                            <i className={`fa fa-${login.icon}`}></i> {login.title}
                        </h1>
                        <label className='mt-2'><i className={`fa fa-user mr-2`}></i>{login.email}</label>
                    </div>
                        <p className='lead text-muted'>{login.subtitle}</p>
                        <label className='d-flex justify-content-end mb-5' onClick={() => dispatch(logout())}>Sair</label>
                </div>
                
            </div>
        </header>
    )
}
export default connect(state => ({login: state}))(Header)