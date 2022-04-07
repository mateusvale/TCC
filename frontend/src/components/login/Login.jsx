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

    form = [1,0,0];

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

    newAccount() {
        this.form = [0,1,0];
        const user = { ...this.state.user }
        this.setState({ user })
    }

    newPassword() {
        this.form = [0,0,1];
        const user = { ...this.state.user }
        this.setState({ user })
    }

    cancel() {
        this.form = [1,0,0];
        const user = { ...this.state.user }
        this.setState({ user })
    }

    renderForm() {
        return (
            this.form[0] === 1 ? 
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

                            <button className="btn btn-secondary ml-2"
                                onClick={() => this.newPassword()}>
                                Esqueceu a senha
                            </button>

                        </div>
                    </div>
                    <a onClick={() => this.newAccount()}><strong>Criar conta</strong></a>
                </div>
            : null
        )
    }

    renderNewAccount() {
        return (
            this.form[1] === 1 ?
                <div>
                    <a className="col-12 d-flex justify-content-center"><strong>Criar nova conta</strong></a>
                    <div className="col-12 col-md-6s">
                        <div className="form-group">
                            <label>Email</label>
                            <input type='text' className="form-control"
                                name='email'
                                placeholder='Digite o email...' />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type='text' className="form-control"
                                name='password'
                                placeholder='Digite a senha...' />
                        </div>

                        <div className="form-group">
                            <label>Repita a senha</label>
                            <input type='text' className="form-control"
                                name='password'
                                placeholder='Digite a senha...' />
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary">
                                Criar
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => this.cancel()}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            : null
        )
    }

    renderNewPassword() {
        return (
            this.form[2] === 1 ?
                <div>
                    <a className="col-12 d-flex justify-content-center"><strong>Reset de senha</strong></a>
                    <div className="col-12 col-md-6s">
                        <div className="form-group">
                            <label>Email</label>
                            <input type='text' className="form-control"
                                name='email'
                                placeholder='Digite o email...' />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type='text' className="form-control"
                                name='password'
                                placeholder='Digite a senha...' />
                        </div>

                        <div className="form-group">
                            <label>Repita a senha</label>
                            <input type='text' className="form-control"
                                name='password'
                                placeholder='Digite a senha...' />
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary">
                                Enviar
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => this.cancel()}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            : null
        )
    }


    render() {
       
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderNewAccount()}
                {this.renderNewPassword()}
            </Main>
        )
    }


}