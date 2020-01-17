import React from 'react';

import MapViewDirections from 'react-native-maps-directions'




const Directions = ({ destination, origin, onReady }) => {

    console.log(origin.latitude, origin.longitude)
    return (
        <MapViewDirections
            destination={destination}
            origin={origin}
            onReady={onReady}
            apikey="apiapiapiapiapiapia"
            strokeWidth={3}
            strokeColor="#222"

        />
    )
}

export default Directions;
