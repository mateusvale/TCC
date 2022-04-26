// import React, { Component } from "react";
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import Main from "../template/Main";
// // import axios from 'axios';

// const headerProps = {
//     icon: 'map-marker',
//     title: 'Mapa',
//     subtitle: 'Cadastre o ponto no mapa onde gostaria de apresentar sua propaganda.'
// }

// export default class Map extends Component {

//     render() {
//         return (
//             <Main {...headerProps}>
//             </Main>
//         )
//     }

// }








// import React, { Component } from "react";
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import Main from "../template/Main";
// // // import axios from 'axios';


// const headerProps = {
//     icon: 'map-marker',
//     title: 'Mapa',
//     subtitle: 'Cadastre o ponto no mapa onde gostaria de apresentar sua propaganda.'
// }

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -22.940816,
//   lng: -43.342566
// };

// const key = process.env.REACT_APP_API_KEY

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: key
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//     <Main {...headerProps}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//     </Main>
//   ) : <></>
// }

// export default React.memo(MyComponent)




import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
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

const center = {
  lat: -3.745,
  lng: -38.523
};

const key = process.env.REACT_APP_API_KEY

export default class Map extends Component {

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
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }
  // onLoad = marker => {
  //   console.log('marker: ', marker)
  // }

  render() {
    return (
      <Main {...headerProps}>
        <div className="">
          <LoadScript googleMapsApiKey={key} libraries={["places"]}>
            <GoogleMap 
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {/* <Marker onLoad={this.onLoad} position={center}/> */}
              <Marker position={center}/>
              <Autocomplete
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
                      marginLeft: "-120px"
                    }}
                  />
              </Autocomplete>
            </GoogleMap>
          </LoadScript>
        </div>
      </Main>
    )
  }
}
