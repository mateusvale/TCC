import './Main.css'
import React, { Component } from 'react'
import Header from './Header'

// export default props =>
const initialState = {
    authenticateUser: 'Login'
}
export default class Main extends Component{

    state = { ...initialState }

    constructor(props){
        super(props)
        // console.log(this.props)
    }


    render(){
        return (
            <React.Fragment>
                <Header {...this.props}/>
                <main className='content container-fluid'>
                    <div className="p-3 mt-3">
                        {this.props.children}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}




    // <React.Fragment>
    //     <Header {...props}/>
    //     <main className='content container-fluid'>
    //         <div className="p-3 mt-3">
    //             {props.children}
    //         </div>
    //     </main>
    // </React.Fragment>