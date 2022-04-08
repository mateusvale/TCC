import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to='/'>
                <i className='fa fa-user-circle-o'></i> Login
            </Link>
            {/* <Link to='/users'>
                <i className='fa fa-users'></i> Usuários
            </Link> */}
            <Link to='/map'>
                <i className='fa fa-map-marker'></i> Mapa
            </Link>
            <Link to='/dashboard'>
                <i className='fa fa-tachometer'></i> Dashboard
            </Link>
        </nav>
    </aside>