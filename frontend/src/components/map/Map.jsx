import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete, Circle } from '@react-google-maps/api';
import Main from "../template/Main";
// // import axios from 'axios';

const headerProps = {
    icon: 'map-marker',
    title: 'Mapa',
    subtitle: 'Cadastre o ponto no mapa onde gostaria de apresentar sua propaganda.'
}

const containerStyle = {
  width: '1249px',
  height: '400px'
};

const key = process.env.REACT_APP_API_KEY

const initialState = {
  centerLocation: { lat: -3.745, lng: -38.523 },
  circleLocation: {},
  isCircleVisible: false,
}

export default class Map extends Component {

  state = { ...initialState }

  enableCircleByClick = false

  constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      this.place = this.autocomplete.getPlace()
      const centerLocation = { 
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }
      this.setState({ centerLocation })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  onClick(event){
    console.log(this.enableCircleByClick)
    if (this.enableCircleByClick){
      const circleLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      } 
      this.setState({ circleLocation, isCircleVisible: true })
    }
  }

  options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  }

  enableClickForCircle() {
    this.enableCircleByClick = true
    // this.setState({ isCircleVisible: true })
    // this.circleIsVisible = true;
  }

  enableAutocompleteForCircle() {
    this.enableCircleByClick = false
    const circleLocation = this.state.centerLocation
    this.setState({ isCircleVisible: true, circleLocation })
  }

  resetCircle(){
    this.enableCircleByClick = false
    this.setState({ isCircleVisible: false, circleLocation : {}  })
  }

  // onLoad = marker => {
  //   console.log('marker: ', marker)
  // }

  render() {
    return (
      <Main {...headerProps}>
        <div className="">
          <LoadScript googleMapsApiKey={ key } libraries={["places"]}>
            <GoogleMap 
              mapContainerStyle={containerStyle}
              center={this.state.centerLocation}
              zoom={10}
              onClick={e => this.onClick(e)}
            >
              {/* <Marker onLoad={this.onLoad} position={center}/> */}
              <Marker position={ this.state.centerLocation }/>
              <Circle options={ this.options } center={ this.state.circleLocation } visible={ this.state.isCircleVisible }/>
              <Autocomplete fields={["formatted_address", "geometry", "name"]} types={["establishment"]}
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `32px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-120px",
                      marginTop: '10px'
                    }}
                  />
              </Autocomplete>
            </GoogleMap>
          </LoadScript>
          <div>
              <div className="text-center mt-2">
                  <div className="form-group">
                      <label>Clique para habilitar o mapa e em seguida escolha o ponto onde gostaria de mostrar sua propaganda</label>
                      <div className="container">
                        <div className="row">
                          <div className="col-sm">
                            <button className="btn btn-primary" disabled={ this.state.isCircleVisible } onClick={ e => this.enableClickForCircle(0) } >Habilitar</button>
                          </div>
                          <div className="col-sm">
                            <button className="btn btn-primary" disabled={ this.state.isCircleVisible } onClick={ e => this.enableAutocompleteForCircle(1) } >Utilizar marcador como ponto</button>
                          </div>
                          <div className="col-sm">
                            <button className="btn btn-primary" onClick={ e => this.resetCircle() } >Reset</button>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </Main>
    )
  }
}
