import React, { Component } from "react";
import Main from "../template/Main";
// import axios from 'axios';

const headerProps = {
    icon: 'map-marker',
    title: 'Mapa',
    subtitle: 'Cadastre o ponto no mapa onde gostaria de apresentar sua propaganda.'
}

export default class Map extends Component {

    render() {
        return (
            <Main {...headerProps}>
            </Main>
        )
    }

}