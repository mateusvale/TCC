import React, { Component } from "react";
import './Header.css'

const userUrl = 'http://localhost:3001/users'

// const initialState = {
//     login: ''
// }

export default class Header extends Component {

    // state = { ...initialState }
    
    constructor(props){
        super(props)
        // console.log(this.props)
    }
    



    // componentWillMount() {
    //     console.log(this.props)
    //   }

    
// export default props =>
    render(){
        return (
        <header className='header d-none d-sm-flex flex-column'>
        <div>
            <div>
                <div className='d-flex justify-content-between'>
                    <h1 className="mt-3 justify-content-start">
                        <i className={`fa fa-${this.props.icon}`}></i> {this.props.title}
                    </h1>
                    <label className='mt-2'><i className={`fa fa-user `}></i>{this.props.login}</label>
                </div>
                {/* <div className='d-flex'> */}
                    <p className='lead text-muted'>{this.props.subtitle}</p>
                    <label className='d-flex justify-content-end mb-5'>Sair</label>
                {/* </div> */}
            </div>
            {/* <div className='d-flex justify-content-end'>
                <label className='d-flex justify-content-end'>Usuário</label>
                <label className='d-flex justify-content-end mb-5'>Sair</label>
            </div> */}
        </div>
    </header>)
    }
}