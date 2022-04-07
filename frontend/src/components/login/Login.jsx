import React, { Component } from "react";
import Main from "../template/Main";
// import axios from 'axios';

const headerProps = {
    icon: 'home',
    title: 'Login',
    subtitle: 'Login na plataforma'
}

export default class Login extends Component {

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type='text' className="form-control"
                                name='email'
                                // value={this.state.user.name}
                                // onChange={e => this.updateField(e)}
                                placeholder='Digite o email...' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type='text' className="form-control"
                                name='senha'
                                //value={this.state.user.email}
                                // onChange={e => this.updateField(e)}
                                placeholder='Digite a senha...' />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary">
                            {/* onClick={e => this.save(e)}> */}
                            Entrar
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