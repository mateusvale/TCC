import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete, Circle, useGoogleMap } from '@react-google-maps/api';
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
  centerLocation: { lat: -22.940581374458727, lng: -43.34338301801839 },
  circleLocation: {},
  map: {},
  isCircleVisible: false,
  isMarkerVisible: false,
  disableButtons: false,
  radiusCircle: 1000
}

export default class Map extends Component {

  state = { ...initialState }

  enableCircleByClick = false

  count = 0

  // map = useGoogleMap()

  boundsCallBack = () => {
    const {map} = this.state;
    console.log('map: ', map)
}

  handleMapLoad = (map) => {
      this.setState((state) => ({ ...state, map }));
  }

  constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    //console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      this.place = this.autocomplete.getPlace()
      const centerLocation = { 
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }
      this.setState({ centerLocation})
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  onClick(event){
    console.log(this.state.map)
    if (this.enableCircleByClick){
      const circleLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.enableCircleByClick = false 
      this.setState({ circleLocation, isCircleVisible: true, disableButtons: false })
      this.insertMarks()
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
    zIndex: 1
  }

  enableClickForCircle() {
    this.enableCircleByClick = true
    this.setState({ disableButtons: true })
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
    let radius = this.state.radiusCircle
    if (operator === '+'){
      radius += 100
    }
    else {
      radius -= 100
    }
    this.setState({ radiusCircle: radius })  
  }

  handleAutocompleteMarker(){
    const isMarkerVisible = !this.state.isMarkerVisible
    this.setState({ isMarkerVisible })
  }

  insertMarks(){
    const google = window.google
    let request = {
      location: this.state.circleLocation,
      radius: this.state.radiusCircle,
      type: ['transit_station'],
      }
      const service = new google.maps.places.PlacesService(this.state.map);
      service.nearbySearch(request, this.callback);
  }

  callback(results, status, pagination) {
    const google = window.google
    pagination.nextPage();  //will load 40 more results. Can be searched only 60 differents bus stations.
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
  
        //this.count ++;
        let info = {
          id: results[i].place_id,
          name: results[i].name,
          coordinates: {lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng() }
        }
        
        console.log(info);

        // marker = new google.maps.Marker({
        //   map: map,
        //   position: info.coordinates,
        //   label: count.toString()
        // });


        // markers.push(marker);
      }
    }
    // let establishment = typeOfPlaces.filter(element => element.original == typeOfPlacesDropdown.value);
    // numOfplaces.textContent = (count < 60) ? `Número de ${establishment[0].translated}: ${count}` : `Número de ${establishment[0].translated}: ${count}+`;
}

  

  render() {
    return (
      <Main {...headerProps}>
        <div className="">
          <LoadScript googleMapsApiKey={ true } libraries={["places"]}>
          {/* <LoadScript googleMapsApiKey={ key } libraries={["places"]}> */}
            <GoogleMap 
              onDragEnd={this.boundsCallBack}
              onLoad={this.handleMapLoad}
              mapContainerStyle={containerStyle}
              center={this.state.centerLocation}
              zoom={15}
              onClick={e => this.onClick(e)}
            >
              {/* <Marker onLoad={this.onLoad} position={center}/> */}
              <Marker position={ this.state.centerLocation } visible={this.state.isMarkerVisible}/>
              <Circle options={ this.options } radius={this.state.radiusCircle} center={ this.state.circleLocation } visible={ this.state.isCircleVisible } />
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
            <div className="ml-5">
              <label className="ml-5" >Habilite o mapa e clique no ponto ou utilize o marcador como ponto.</label>
              <div className="d-flex justify-content-center" >
                <button className="btn btn-primary mr-1" disabled={ this.state.disableButtons } onClick={ e => this.enableClickForCircle(0) }>Habilitar</button>
                <button className="btn btn-primary" disabled={ this.state.disableButtons } onClick={ e => this.enableAutocompleteForCircle(1) } >Utilizar marcador como ponto</button>
                <button className="btn btn-light ml-1" onClick={ e => this.resetCircle() } >Reset</button>
              </div>
            </div>
            <div>
              <label className="ml-5" >Redimensione o raio do círculo.</label>
              <div className="d-flex justify-content-center" >
                <button className="btn btn-outline-danger mr-1" onClick={e => this.resizeCircle('-')}>-</button>
                <button className="btn btn-outline-success" onClick={e => this.resizeCircle('+')} >+</button>
              </div>
            </div>
            <div>
              <label className="ml-5">Mostrar marcador</label>
              <div className="input-group-prepend">
                <div className="input-group-text ml-5">
                  <input defaultChecked={this.state.isMarkerVisible} onChange={e => this.handleAutocompleteMarker()} type="checkbox" aria-label="Checkbox for following text input"/>
                </div>
              </div>
            </div>
          </div>

          <div className="row  bg-light  mt-2 ml-1 mr-1">
            <div className="col-sm-4 align-self-center">Opcional: mostrar estabelecimentos no mapa</div>
            <div className="col-sm-8">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sem valor
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
                <button className="ml-1 mr-1 btn btn-primary">Inserir marcações</button>
                <button className="btn btn-secondary">Apagar marcações</button>
              </div>
            </div>
          </div>
          {/* <div className="row bg-light mt-2 ml-1 mr-1" >
            <label className="row align-self-center" >Opcional: mostrar estabelecimentos no mapa</label>
            <select id="buslines-dropdown">
              <option value='noValue'>Sem valor</option>
            </select>
            <button>Inserir marcações</button>
            <button>Apagar marcações</button>
          </div> */}
        </div>
      </Main>
    )
  }
}
