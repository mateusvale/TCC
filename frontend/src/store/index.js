import { createStore } from 'redux'
import { LogOutUserDB } from "../helpers/db_controller"

const INICIAL_STATE = {
    id: -1,
    email: "Login",
    imageUrl: ""
}


function reducer(state = INICIAL_STATE, action){
    if (action.type === 'AUTHENTICATE_LOGIN'){
        return { ... state, id: action.id, email: action.email }
    }
    else if (action.type === 'SCREEN_HEADER'){
        return { ... state, icon: action.icon, title: action.title, subtitle: action.subtitle  }
    }
    else if (action.type === 'LOGOUT_USER'){
        LogOutUserDB()
        return { ... state, id: INICIAL_STATE.id, email: INICIAL_STATE.email }
    }
    else if (action.type === "SUBMIT_IMAGE"){
        return { ... state, imageUrl: action.url}
    }
    
    return state;
}

const store = createStore(reducer);

export default store;