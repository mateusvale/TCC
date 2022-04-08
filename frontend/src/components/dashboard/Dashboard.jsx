import React, { Component } from "react";
import Main from "../template/Main";
// import axios from 'axios';

const headerProps = {
    icon: 'tachometer',
    title: 'Dashboard',
    subtitle: 'Verifique todas as propagandas que possui.'
}

export default class Map extends Component {

    render() {
        return (
            <Main {...headerProps}>
            </Main>
        )
    }

}