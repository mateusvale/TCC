import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios';

const headerProps = {
    icon: 'tachometer',
    title: 'Dashboard',
    subtitle: 'Gerencie todas as propagandas que possui.'
}

const userUrl = 'http://localhost:3001/users'
const marketingUrl = 'http://localhost:3001/marketing'

const initialState = {
    list: []
}

export default class Map extends Component {

    state = { ...initialState }

    componentWillMount() {
        this.verifyloggedUser()
    }

    verifyloggedUser(){
        let user = null
        axios(userUrl).then(resp => {
          user = resp.data.find(u => u.login == true)
          if (user){
            this.verifyMarketing(user.id)
            return
          }
          alert("Nenhum usuário logado!")
        })
      }

    verifyMarketing(id){
        axios(marketingUrl).then(resp => {
            const list = resp.data.filter(u => u.userId === id)
            this.setState({list})
        })
    }

    delete(index){
        const list = this.state.list[index]
        // console.log(list)
        axios.delete(`${marketingUrl}/${list.id}`)
            .then((resp) => {
                const list = this.getUpdatedList(index);
                this.setState({ list });
            })
    }

    getUpdatedList(indexList){
        const newlist = this.state.list.filter((u,index) => indexList !== index )
        console.log(newlist)
        return newlist
    }


    render() {
        return (
            <Main {...headerProps}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nº da linha</th>
                            <th scope="col">Raio</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Deletar</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.list.map((marketing, index) => {
                            return ( 
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{marketing.busLine}</td>
                                    <td>{marketing.radius}</td>
                                    <td>{marketing.coordinates.lat}</td>
                                    <td>{marketing.coordinates.lng}</td>
                                    <td><button onClick={e => this.delete(index)} >Deletar</button></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </Main>
        )
    }

}