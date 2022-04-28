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
  disableButtons: false,
  radiusCircle: 30000
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
      this.enableCircleByClick = false 
      this.setState({ circleLocation, isCircleVisible: true, disableButtons: false })
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
    radius: this.state.radiusCircle,
    zIndex: 1
  }

  enableClickForCircle() {
    this.enableCircleByClick = true
    this.setState({ disableButtons: true })
    // this.circleIsVisible = true;
  }

  enableAutocompleteForCircle() {
    this.enableCircleByClick = false
    const circleLocation = this.state.centerLocation
    this.setState({ isCircleVisible: true, circleLocation, disableButtons: true })
  }

  resetCircle(){
    this.enableCircleByClick = false
    this.setState({ isCircleVisible: false, circleLocation : {}, disableButtons: false  })
  }

  resizeCircle(operator){
    if (operator === '+'){
      this.state.radiusCircle += 100
      this.options.radius = this.state.radiusCircle
    }
    else
      this.state.radiusCircle -= 100
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
          <div className="row bg-light mt-2 ml-1 mr-1">
            <div>
              <label className="ml-5" >Habilite o mapa e escolha o ponto onde mostrará sua propaganda ou utilize o marcador como ponto.</label>
              <div className="d-flex justify-content-center" >
                <button className="btn btn-primary mr-1" disabled={ this.state.disableButtons } onClick={ e => this.enableClickForCircle(0) }>Habilitar</button>
                <button className="btn btn-primary" disabled={ this.state.disableButtons } onClick={ e => this.enableAutocompleteForCircle(1) } >Utilizar marcador como ponto</button>
                <button className="btn btn-light ml-1" onClick={ e => this.resetCircle() } >Reset</button>
              </div>
            </div>
            <div>
              <label className="ml-5" >Aumente ou diminua o tamanho do raio do círculo.</label>
              <div className="d-flex justify-content-center" >
                <button className="btn btn-outline-danger mr-1" onClick={e => this.state.radiusCircle('-')}>-</button>
                <button className="btn btn-outline-success" onClick={e => this.state.radiusCircle('+')} >+</button>
              </div>
            </div>
          </div>
        </div>
      </Main>
    )
  }
}
