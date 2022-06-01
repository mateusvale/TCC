import './Main.css'
import React, { Component } from 'react'
import Header from './Header'
// import { Provider } from "react-redux";

// import store from '../../store';

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
                {/* <Provider store={store} > */}
                    <Header {...this.props}/>
                    <main className='content container-fluid'>
                        <div className="p-3 mt-3">
                            {this.props.children}
                        </div>
                    </main>
                {/* </Provider> */}
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