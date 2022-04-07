import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios';

const headerProps = {
    icon: 'home',
    title: 'Login',
    subtitle: 'Login na plataforma'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { email: '', password: '' },
    list: []
}

export default class Login extends Component {

    state = { ...initialState }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    loginUser() {
        const user = this.state.user;
        //console.log(user)
        axios['get'](baseUrl)
            .then(resp => {
                this.areCredentialsCorrect(user, resp.data)
                //const list = resp.data;
                // this.setState({ user: initialState.user, list });
            })
    }

    areCredentialsCorrect(user, list) {
        const element = list.find(u => u.email === user.email)
        if (element){
            const alertMessage = (user.password === element.password) ? "Login realizado" : "Senha errada"
            alert(alertMessage)
            return
        }
        alert('Usuário não existe!')
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type='text' className="form-control"
                                name='email'
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o email...' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type='text' className="form-control"
                                name='password'
                                value={this.state.user.password}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite a senha...' />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.loginUser(e)}>
                            Login
                        </button>

                        <button className="btn btn-secondary ml-2">
                            {/* onClick={e => this.clear(e)}> */}
                            Esqueceu a senha
                        </button>

                    </div>
                </div>
                <a><strong>Criar conta</strong></a>
            </div>
            
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {/* {this.renderTable()} */}
            </Main>
        )
    }


}