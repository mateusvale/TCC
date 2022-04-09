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

import React, { Component } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Main from "../template/Main";
// // import axios from 'axios';


const headerProps = {
    icon: 'map-marker',
    title: 'Mapa',
    subtitle: 'Cadastre o ponto no mapa onde gostaria de apresentar sua propaganda.'
}

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -22.940816,
  lng: -43.342566
};

const key = process.env.REACT_APP_API_KEY

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <Main {...headerProps}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </Main>
  ) : <></>
}

export default React.memo(MyComponent)