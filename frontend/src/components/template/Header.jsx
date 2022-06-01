import './Header.css'
import React from 'react'

import { connect } from "react-redux";

// export default props => 
const Header = ({ props, login}) => {
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
                    {/* <div className='d-flex'> */}
                        {/* <p className='lead text-muted'>props.subtitle</p> */}
                        <p className='lead text-muted'>{login.subtitle}</p>
                        <label className='d-flex justify-content-end mb-5'>Sair</label>
                    {/* </div> */}
                </div>
                {/* <div className='d-flex justify-content-end'>
                    <label className='d-flex justify-content-end'>Usuário</label>
                    <label className='d-flex justify-content-end mb-5'>Sair</label>
                </div> */}
            </div>
        </header>
    )
}

export default connect(state => ({login: state}))(Header)