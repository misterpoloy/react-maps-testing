import React, { Component }  from 'react';
import MapView, { Marker } from 'react-native-maps'
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';

const MARKS = [
  {
    latlng: {
      latitude: 19.423300,
      longitude: -99.153696,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    title: "Edgar Abraham Núñez García",
    description: "Servicura Cuauhtémoc",
  },
  {
    latlng: {
      latitude: 19.400195,
      longitude: -99.203731,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    title: "Rodrigo Yahel Adame Moreno",
    description: "Cebtri Nñeduci ABC Observatorio",
  },
  {
    latlng: {
      latitude: 19.421456,
      longitude: -99.156192,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    title: "Ramon Olavide",
    description: "Hospital Ángeles Clinica londres piso 4",
  },
  {
    latlng: {
      latitude: 19.415194,
      longitude: -99.157093,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    title: "Ramon Olvaide",
    description: "Hospital Amgeñes roma piso 1",
  },
  {
    latlng: {
      latitude: 19.399930,
      longitude: -99.203391,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    title: "Ali Lupita Garcia Tuomola",
    description: "Centro médico ABC observatorio",
  },
]; 


class App extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      myPosition: {
        // Default CDMX Sofia's home
        latitude: 19.416862,
        longitude: -99.172404,
      },
    };
  }
  componentDidMount() {
    this.mounted = true;
    // If you supply a coordinate prop, we won't try to track location automatically
    if (this.props.coordinate) {
      return;
    }

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted && this.mounted) {
          this.watchLocation();
        }
      });
    } else {
      this.watchLocation();
    }
  }

  watchLocation() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log("position", position);
        const myLastPosition = this.state.myPosition;
        const myPosition = position.coords;
        console.log("myPosition, myLastPosition", myPosition, myLastPosition);
        if (!myLastPosition || myPosition.latitude !== myLastPosition.latitude) {
          console.log("ARE DIFFERENT!");
          this.setState({ myPosition });
        }
      },
      null,
      this.props.geolocationOptions
    );
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }

  resetRegion = () => {
    console.log("resetRegion");
    const { myPosition } = this.state;
    this.map.animateToRegion({ ...myPosition, 
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },1000)
  }

  render() {
    console.log("render");
    const { myPosition } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={(map) => { this.map = map; }}
          style={{ flex: 1 }}
          region={{
              ...myPosition,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134,
          }}
          showsUserLocation
          loadingEnabled
        >
          {MARKS.map(marker => (
            <Marker
              key={marker.title}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
          </MapView>
          <View style={{
            width: '95%',  
            height: 150,
            borderRadius: 10,
            padding: 20,
            backgroundColor: 'white', 
            position: 'absolute',                                          
            bottom: 10,
            marginLeft: 10,
          }}>
            <Text>Hola Mundo</Text>
          </View>
          <TouchableOpacity
            onPress={this.resetRegion}
            style={{
              width: 60,  
              height: 60,   
              borderRadius: 30,
              padding: 20,
              backgroundColor: 'white',                                    
              position: 'absolute',                                          
              bottom: 180,                                                    
              right: 10, 
            }}>
            <Text>🎯</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default App;
