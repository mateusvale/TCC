import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios';

const headerProps = {
    icon: 'user-circle-o',
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

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    //[1,0,0] = main form ; [0,1,0] = new account ; [0,0,1] = reset password form
    form = [1,0,0];

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    loginUser() {
        const user = this.state.user;
        const list = this.state.list;
        const element = list.find(u => u.email === user.email)
        if (element){
            const alertMessage = (user.password === element.password) ? "Login realizado" : "Senha errada"
            alert(alertMessage)
        }
        else
            alert('Usuário não existe!');
        this.clear();
    }

    showForms(num) {
        this.form = [0, 0, 0];
        this.form[num] = 1;
        this.clear();
        // const user = { ...this.state.user }
        // this.setState({ user })
    }

    sendNewAccount() {
        const user = this.state.user;
        axios['post'](baseUrl, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ user: initialState.user, list });
            })
        alert('Usuário criado com sucesso!');
        this.showForms(0);
    }

    sendNewPassword() {
        const user = this.state.user;
        const list = this.state.list;
        const element = list.find(u => u.email === user.email);
        if (element){
            axios['put'](`${baseUrl}/${element.id}`, user)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data);
                    this.setState({ user: initialState.user, list });
                })
            alert('Senha resetada com sucesso!')
            this.showForms(0);
            return
        }
        alert('Usuário não existe!')
        this.clear();
    }

    getUpdatedList(user, add = true){
        //remover o user da lista
        const list = this.state.list.filter(u => u.id !== user.id)
        //se for para acrescentar:
        if(add) 
            //list.unshift(user)
            list.push(user)
        return list
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    renderMainForm() {
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
                                <input type='password' className="form-control"
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
                                onClick={() => this.showForms(2)}>
                                Esqueceu a senha
                            </button>

                        </div>
                    </div>
                    <a onClick={() => this.showForms(1)}><strong>Criar conta</strong></a>
                </div>
            : null
        )
    }

    renderNewAccountOrResetPassword() {
        return (
            this.form[0] === 0 ?
                <div>
                    <a className="col-12 d-flex justify-content-center">
                        <strong>{this.form[1] === 1 ? 'Criar nova conta' : 'Reset de senha' }</strong></a>
                    <div className="col-12 col-md-6s">
                        <div className="form-group">
                            <label>Email</label>
                            <input type='text' className="form-control"
                                name='email'
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o email...' />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type='text' className="form-control"
                                name='password'
                                value={this.state.user.password}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite a senha...' />
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={this.form[1] === 1 ? () => this.sendNewAccount() : () => this.sendNewPassword()}>
                                {this.form[1] === 1 ? 'Criar' : 'Enviar' }
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => this.showForms(0)}>
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
                {this.renderMainForm()}
                {this.renderNewAccountOrResetPassword()}
            </Main>
        )
    }
}