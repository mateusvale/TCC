import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete, Circle, useGoogleMap } from '@react-google-maps/api';
import Main from "../template/Main";
import Axios from "axios";
import axios from 'axios';

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

const userUrl = 'http://localhost:3001/users'
const marketingUrl = 'http://localhost:3001/marketing'
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
  // selectValueBus: 100,
  selectValueBus: "noValue",
  markersPlaceList: [],
  markersBusList: []
}

export default class Map extends Component {

  state = { ...initialState }

  enableCircleByClick = false

  typeOfPlaces = [
    { original: 	'accounting',	translated: 	'Contabilidade' },
    { original: 	'airport',	translated: 	'Aeroporto' },
    { original: 	'amusement_park',	translated: 	'Parque De Diversões' },
    { original: 	'aquarium',	translated: 	'Aquário' },
    { original: 	'art_gallery',	translated: 	'Galeria De Arte' },
    { original: 	'atm',	translated: 	'Caixa Eletrônico' },
    { original: 	'bakery',	translated: 	'Padaria' },
    { original: 	'bank',	translated: 	'Banco' },
    { original: 	'bar',	translated: 	'Bar' },
    { original: 	'beauty_salon',	translated: 	'Salão De Beleza' },
    { original: 	'bicycle_store',	translated: 	'Bicicletário' },
    { original: 	'book_store',	translated: 	'Livraria' },
    { original: 	'bowling_alley',	translated: 	'Boliche' },
    { original: 	'bus_station',	translated: 	'Estação De Onibus' },
    { original: 	'cafe',	translated: 	'Cafeteria' },
    { original: 	'campground',	translated: 	'Área De Camping' },
    { original: 	'car_dealer',	translated: 	'Vendedor De Carros' },
    { original: 	'car_rental',	translated: 	'Aluguel De Carros' },
    { original: 	'car_repair',	translated: 	'Reparo De Carros' },
    { original: 	'car_wash',	translated: 	'Lava-Jato' },
    { original: 	'casino',	translated: 	'Cassino' },
    { original: 	'cemetery',	translated: 	'Cemitério' },
    { original: 	'church',	translated: 	'Igreja' },
    { original: 	'city_hall',	translated: 	'Câmara Municipal' },
    { original: 	'clothing_store',	translated: 	'Loja De Roupas' },
    { original: 	'convenience_store',	translated: 	'Loja De Conveniência' },
    { original: 	'courthouse',	translated: 	'Tribunal' },
    { original: 	'dentist',	translated: 	'Dentista' },
    { original: 	'department_store',	translated: 	'Loja De Departamento' },
    { original: 	'doctor',	translated: 	'Consultório Médico' },
    { original: 	'drugstore',	translated: 	'Drogaria' },
    { original: 	'electrician',	translated: 	'Eletricista' },
    { original: 	'electronics_store',	translated: 	'Loja De Eletrônicos' },
    { original: 	'embassy',	translated: 	'Embaixada' },
    { original: 	'fire_station',	translated: 	'Corpo De Bombeiros' },
    { original: 	'florist',	translated: 	'Florista' },
    { original: 	'funeral_home',	translated: 	'Funerária' },
    { original: 	'furniture_store',	translated: 	'Loja De Móveis' },
    { original: 	'gas_station',	translated: 	'Posto De Gasolina' },
    { original: 	'gym',	translated: 	'Academia' },
    { original: 	'hair_care',	translated: 	'Cabelereiro' },
    { original: 	'hardware_store',	translated: 	'Loja De Hardware' },
    { original: 	'hindu_temple',	translated: 	'Templo Hindu' },
    { original: 	'home_goods_store',	translated: 	'Loja De Artigos Para Casa' },
    { original: 	'hospital',	translated: 	'Hospital' },
    { original: 	'insurance_agency',	translated: 	'Agência De Seguros' },
    { original: 	'jewelry_store',	translated: 	'Joalheria' },
    { original: 	'laundry',	translated: 	'Lavanderia' },
    { original: 	'lawyer',	translated: 	'Advogado' },
    { original: 	'library',	translated: 	'Biblioteca' },
    { original: 	'light_rail_station',	translated: 	'Estação De Trilhos Leves' },
    { original: 	'liquor_store',	translated: 	'Loja De Bebidas' },
    { original: 	'local_government_office',	translated: 	'Escritório Do Governo Local' },
    { original: 	'locksmith',	translated: 	'Chaveiro' },
    { original: 	'lodging',	translated: 	'Alojamento' },
    { original: 	'meal_delivery',	translated: 	'Delivery De Comida' },
    { original: 	'meal_takeaway',	translated: 	'Local De Resgate De Comida' },
    { original: 	'mosque',	translated: 	'Mesquita' },
    { original: 	'movie_rental',	translated: 	'Aluguel De Filme' },
    { original: 	'movie_theater',	translated: 	'Cinema' },
    { original: 	'moving_company',	translated: 	'Empresa De Mudança' },
    { original: 	'museum',	translated: 	'Museu' },
    { original: 	'night_club',	translated: 	'Boate' },
    { original: 	'painter',	translated: 	'Pintor' },
    { original: 	'park',	translated: 	'Parque' },
    { original: 	'parking',	translated: 	'Estacionamento' },
    { original: 	'pet_store',	translated: 	'Loja De Animais' },
    { original: 	'pharmacy',	translated: 	'Farmacia' },
    { original: 	'physiotherapist',	translated: 	'Fisioterapeuta' },
    { original: 	'plumber',	translated: 	'Encanador' },
    { original: 	'police',	translated: 	'Polícia' },
    { original: 	'post_office',	translated: 	'Correios' },
    { original: 	'primary_school',	translated: 	'Escola Primaria' },
    { original: 	'real_estate_agency',	translated: 	'Agência Imobiliária' },
    { original: 	'restaurant',	translated: 	'Restaurante' },
    { original: 	'roofing_contractor',	translated: 	'Empreiteiro De Telhados' },
    { original: 	'rv_park',	translated: 	'Rv_Park' },
    { original: 	'school',	translated: 	'Escola' },
    { original: 	'secondary_school',	translated: 	'Ensino Médio' },
    { original: 	'shoe_store',	translated: 	'Loja De Sapatos' },
    { original: 	'shopping_mall',	translated: 	'Centro De Compras' },
    { original: 	'spa',	translated: 	'Spa' },
    { original: 	'stadium',	translated: 	'Estádio' },
    { original: 	'storage',	translated: 	'Local De Armazenamento' },
    { original: 	'store',	translated: 	'Loja' },
    { original: 	'subway_station',	translated: 	'Estação De Metrô' },
    { original: 	'supermarket',	translated: 	'Supermercado' },
    { original: 	'synagogue',	translated: 	'Sinagoga' },
    { original: 	'taxi_stand',	translated: 	'Ponto De Taxi' },
    { original: 	'tourist_attraction',	translated: 	'Atração Turística' },
    { original: 	'train_station',	translated: 	'Estação De Trem' },
    { original: 	'transit_station',	translated: 	'Ponto De Ônibus' },
    { original: 	'travel_agency',	translated: 	'Agência De Viagens' },
    { original: 	'university',	translated: 	'Universidade' },
    { original: 	'veterinary_care',	translated: 	'Veterinário' },
    { original: 	'zoo',	translated: 	'Jardim Zoológico' },
    ];

    busLines = ['6',	'7',	'100',	'102',	'104',	'105',	'107',	'108',	'109',	'110',	'112',	'117',
    '133',	'201',	'202',	'209',	'210',	'217',	'220',	'232',	'238',	'239',	'247',	'249',	'265',
    '275',	'292',	'296',	'298',	'300',	'301',	'302',	'306',	'309',	'312',	'313',	'315',	'321',
    '323',	'324',	'325',	'326',	'327',	'328',	'329',	'335',	'338',	'339',	'341',	'342',	'343',
    '348',	'350',	'353',	'355',	'361',	'362',	'363',	'368',	'369',	'371',	'378',	'380',	'383',
    '384',	'386',	'390',	'393',	'394',	'397',	'399',	'409',	'412',	'415',	'416',	'422',	'426',
    '432',	'433',	'440',	'442',	'448',	'455',	'457',	'460',	'461',	'463',	'471',	'472',	'473',
    '474',	'476',	'483',	'485',	'492',	'497',	'498',	'507',	'538',	'539',	'548',	'550',	'552',
    '553',	'554',	'557',	'558',	'565',	'583',	'584',	'600',	'601',	'606',	'607',	'608',	'610',
    '611',	'613',	'614',	'615',	'621',	'622',	'623',	'624',	'625',	'627',	'628',	'629',	'630',
    '634',	'636',	'638',	'639',	'645',	'650',	'663',	'665',	'669',	'679',	'680',	'685',	'687',
    '688',	'691',	'692',	'693',	'696',	'711',	'712',	'721',	'731',	'745',	'746',	'752',	'756',
    '759',	'766',	'770',	'771',	'774',	'775',	'777',	'779',	'783',	'790',	'793',	'794',	'795',
    '801',	'802',	'803',	'804',	'805',	'810',	'812',	'819',	'821',	'822',	'829',	'833',	'835',
    '837',	'838',	'840',	'841',	'842',	'843',	'844',	'846',	'847',	'848',	'849',	'850',	'851',
    '852',	'853',	'859',	'861',	'862',	'863',	'864',	'866',	'867',	'868',	'869',	'875',	'878',
    '880',	'883',	'884',	'892',	'893',	'895',	'897',	'898',	'900',	'905',	'906',	'908',	'910',
    '913',	'917',	'918',	'919',	'920',	'922',	'923',	'925',	'926',	'932',	'936',	'940',	'942',
    '945',	'946',	'950',	'953',	'954',	'2110',	'2111',	'2112',	'2114',	'2303',	'2307',	'2310',	'2331',
    '2332',	'2334',	'2335',	'2336',	'2337',	'2338',	'2339',	'2342',	'2343',	'2344',	'2345',	'2381',	'2383',
    '2802',	'2803',	'2804',	'SP265',	'SP513',	'SP803',	'SP841',	'SV474',	'SV774',	'SV779',	'SV790',
    'SV843',	'SV866',	'SV917'];

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
    Axios(url).then(resp => {
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
      user = resp.data.find(u => u.login == true)
      if (user){
        this.sendMarketing(user.id)
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
              {/* <Marker onLoad={this.onLoad} position={center}/> */}
              <Marker position={ this.state.centerLocation } visible={this.state.isMarkerVisible}/>
              
              {this.state.markersPlaceList.map((marker, index) => {
                //console.log("oi")
                return <Marker key={index} position={marker.coordinates} visible={true} label={(index+1).toString()}/>
              })}

              {this.state.markersBusList.map((marker, index) => {
                //console.log("oi")
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
                  {this.typeOfPlaces.map((place, index) => {
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
                  {this.busLines.map((line, index) => {
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
        </div>
      </Main>
    )
  }
}
