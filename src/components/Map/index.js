import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {getPixelSize} from '../../utils';

import Geolocation from '@react-native-community/geolocation';

import Search from '../Seach';
import Directions from '../Directions';

import markerImage from '../../assets/marker.png';

import {
  LocationBox,
  LocationTimeBox,
  LocationText,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
  };

  componentDidMount() {
    // Componente de permissão para usar a localização do smartphone

    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        });
      }, // sucesso
      err => {
        console.log(err);
      }, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }

  handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  render() {
    // Irá rederizar novamente toda a vez que o estado for modificado
    const {region, destination} = this.state;

    //Usar todos os componentes depois do mapa
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}>
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(50),
                    },
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{x: 0, y: 0}}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{x: 0, y: 0}}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>31</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>R. Guilherme Gemballa</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
    );
  }
}
