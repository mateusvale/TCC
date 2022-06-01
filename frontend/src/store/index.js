import { createStore } from 'redux'

const INICIAL_STATE = {
    id: -1,
    email: "Login"
}

function reducer(state = INICIAL_STATE, action){
    if (action.type === 'AUTHENTICATE_LOGIN'){
        return { ... state, id: action.id, email: action.email }
    }
    else if (action.type === 'LOGIN_SCREEN'){
        return { ... state, icon: action.icon, title: action.title, subtitle: action.subtitle  }
    }
    
    return state;
}

const store = createStore(reducer);

export default store;