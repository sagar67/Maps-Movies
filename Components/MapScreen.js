import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, SafeAreaView, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MoviesList from './Movies';

function MapScreen({navigation}) {
  const [currentLocation, setCurrentLocation] = useState();
  const [currentCordinates, setCurrentCordinates] = useState();

  useEffect(() => {
    getPermission();
    initialData()
  }, []);

  const initialData = () => {
    try {
      Geolocation.getCurrentPosition(async position => {
        try {
          var currentAddress = {};
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);

          const currentPosition = {
            position: {
              lat: parseFloat(currentLatitude),
              lng: parseFloat(currentLongitude),
            },
          };
          currentAddress = {
            ...currentAddress,
            ...currentPosition,
          };
          setCurrentLocation(currentAddress);
          setCurrentCordinates({
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          });
        } catch (err) {}
      });
    } catch (err) {}
  };

  const getPermission = async params => {
    let granted = '';
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      navigation.pop();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 0.6}}>
        <MapView
          region={{
            latitude: currentCordinates?.latitude || 12.9716,
            longitude: currentCordinates?.longitude || 77.5946,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          style={{flex: 1,
            height: 400,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

          }}>
          <Marker
            coordinate={{
              latitude: currentCordinates?.latitude || 12.9716,
              longitude: currentCordinates?.longitude || 77.5946,
            }}
          />
        </MapView>
      </View>
      <View style={{flex: 0.4}}>
        <MoviesList />
      </View>
    </SafeAreaView>
  );
}

export default MapScreen;
