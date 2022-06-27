import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete, Circle } from '@react-google-maps/api';
import Main from "../template/Main";
import GoogleDriveFileUploader from "../uploader/GoogleDriveFileUploader";
import axios from 'axios';
import { typeOfPlaces, busLines } from "../../assets/data/data";
import { connect } from "react-redux";

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

// const userUrl = 'http://localhost:3001/logged_user'
// const marketingUrl = 'http://localhost:3001/marketing'
const userUrl = 'https://json-server-heroku-tcc.herokuapp.com/logged_user'
const marketingUrl = 'https://json-server-heroku-tcc.herokuapp.com/marketing'
const busUrl = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm'
//const busUrl = 'https://jeap.rio.rj.gov.br/dadosAbertosAPI/v2/transporte/veiculos/onibus'

const initialState = {
  centerLocation: { lat: -22.940581374458727, lng: -43.34338301801839 },
  circleLocation: {},
  map: {},
  isCircleVisible: false,
  isMarkerVisible: false,
  disableButtons: false,
  radiusCircle: 1000,
  selectValuePlace: "noValue",
  selectValueBus: "noValue",
  markersPlaceList: [],
  markersBusList: []
}

class Map extends Component {

  state = { ...initialState }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
        type: 'SCREEN_HEADER',
        icon: 'map-marker',
        title: 'Mapa',
        subtitle: 'Cadastre o ponto no mapa onde gostaria de apresentar sua propaganda.'
    })
  }

  enableCircleByClick = false

  // map = useGoogleMap()

  boundsCallBack = () => {
    const {map} = this.state;
    //console.log('map: ', map)
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
    //console.log(this.state.map)
    if (this.enableCircleByClick){
      const circleLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.enableCircleByClick = false 
      this.setState({ circleLocation, isCircleVisible: true, disableButtons: false })
      // this.insertPlacesMarks()
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

  //###placesLocation###

  insertPlacesMarkers(){
    const google = window.google
    let request = {
      location: this.state.circleLocation,
      radius: this.state.radiusCircle,
      // type: ['transit_station'],
      type: [this.state.selectValuePlace],
    }
    //console.log(request)
    const service = new google.maps.places.PlacesService(this.state.map);
    service.nearbySearch(request, this.callback);
  }

  callback = (results, status, pagination) => {
    const google = window.google
    const list = []
    pagination.nextPage();  //will load 40 more results. Can be searched only 60 differents bus stations.
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
  
        let info = {
          id: results[i].place_id,
          name: results[i].name,
          coordinates: {lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng() }
        }

        list.push(info)
      }
    }
    const markersPlaceList = this.getUpdatedMarkersPlaceList(list)
    this.setState({ markersPlaceList })
  } 

  getUpdatedMarkersPlaceList(markers){
    const list = this.state.markersPlaceList
    markers.map(item => {
      list.push(item)
    })
    return list
  }
 
  handleSelectChange(event, type){
    if (type === "place"){
      this.setState({ selectValuePlace: event.target.value })
      return
    }
    this.setState({ selectValueBus: event.target.value })
  }
  
  erasePlacesMarkers(){
    this.setState({ markersPlaceList: [] })
  }
  //###placesLocation###

  callBusApi(){
  const url = `${busUrl}/onibus/${this.state.selectValueBus}`
  // const url = `${busUrl}/900`
    axios(url).then(resp => {
      console.log(resp.data)
      const markersBusList = this.getUpdatedMarkersBusList(resp.data.DATA)
      this.setState({ markersBusList })
    })
  }

  getUpdatedMarkersBusList(markers){
    const list = this.state.markersBusList
    markers.map(item => {
      list.push(item)
    })
    return list
  }

  eraseBusMarkers(){
    this.setState({ markersBusList: [] })
  }

  verifyloggedUser(){
    let user = null
    axios(userUrl).then(resp => {
      user = resp.data.find(u => u.login_id != -1 )
      if (user){
        console.log(user.login_id)
        this.sendMarketing(user.login_id)
        return
      }
      alert("Nenhum usuário logado!")
    })
  }
  
  sendMarketing(id){
    const marketing = {
      busLine: this.state.selectValueBus,
      radius: this.state.radiusCircle,
      coordinates: {
        lat: this.state.circleLocation.lat,
        lng: this.state.circleLocation.lng
      },
      userId: id,
    }
    axios['post'](marketingUrl, marketing).then(() => {
      alert("Informações enviadas")
      this.resetMarketing()
    })
  }

  resetMarketing(){
    this.resetCircle()
    this.setState({ selectValueBus: initialState.selectValueBus })
  }

  render() {
    return (
      <Main {...headerProps}>
        <div className="">
          {/* <LoadScript googleMapsApiKey={ true } libraries={["places"]}> */}
          <LoadScript googleMapsApiKey={ key } libraries={["places"]}>
            <GoogleMap 
              onDragEnd={this.boundsCallBack}
              onLoad={this.handleMapLoad}
              mapContainerStyle={containerStyle}
              center={this.state.centerLocation}
              zoom={15}
              onClick={e => this.onClick(e)}
            >
              <Marker position={ this.state.centerLocation } visible={this.state.isMarkerVisible}/>
              
              {this.state.markersPlaceList.map((marker, index) => {
                return <Marker key={index} position={marker.coordinates} visible={true} label={(index+1).toString()}/>
              })}

              {this.state.markersBusList.map((marker, index) => {
                return <Marker key={index} position={{ lat: marker[3], lng: marker[4] }} visible={true} label={(marker[2]).toString()}/>
              })}


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
                <select value={this.state.selectValuePlace} onChange={e => this.handleSelectChange(e, "place")} className="align-self-center">
                  <option value='noValue'>Sem valor</option>
                  {typeOfPlaces.map((place, index) => {
                    return <option key={index} value={place.original}>{place.translated}</option>
                  })}
                </select>
                <button onClick={e => this.insertPlacesMarkers()} className="ml-1 mr-1 btn btn-primary">Inserir marcações</button>
                <button onClick={e => this.erasePlacesMarkers()}  className="btn btn-secondary">Apagar marcações</button>
            </div>
          </div>

          <div className="row  bg-light  mt-2 ml-1 mr-1">
            <div className="col-sm-4 align-self-center">Escolha a linha de ônibus</div>
            <div className="col-sm-8">
                <select value={this.state.selectValueBus} onChange={e => this.handleSelectChange(e, "bus")} className="align-self-center">
                  <option value='noValue'>Sem valor</option>
                  {busLines.map((line, index) => {
                    return <option key={index} value={line}>{line}</option>
                  })}
                </select>
                <button onClick={e => this.callBusApi()} className="ml-1 mr-1 btn btn-primary">Inserir ônibus no mapa</button>
                {/* <button onClick={e => this.erasePlacesMarkers()}  className="btn btn-secondary mr-1">Sugestões de linha</button> */}
                <button onClick={e => this.eraseBusMarkers()}  className="btn btn-secondary">Apagar marcações</button>
            </div>
          </div>

          { this.state.selectValueBus !== "noValue" ?  
            <React.Fragment>
              <label className="mt-2 d-flex justify-content-center">Linha de ônibus: {this.state.selectValueBus}</label>
              <label className="d-flex justify-content-center">Raio: {this.state.radiusCircle}m</label>
              <label className="d-flex justify-content-center">Latitude: {this.state.circleLocation.lat}</label>
              <label className="d-flex justify-content-center">Longetude: {this.state.circleLocation.lng}</label>
              <div  className="d-flex justify-content-center">
                <button className="btn btn-primary mr-2" onClick={e => this.verifyloggedUser()} >enviar</button>
                <button className="btn btn-secondary" onClick={e => this.resetMarketing()}>reset</button>
              </div>
            </React.Fragment> : null }
          <GoogleDriveFileUploader/>
        </div>
      </Main>
    )
  }
}

export default connect()(Map)
