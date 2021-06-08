import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import MapView, { Marker }  from "react-native-maps";
import { connect } from 'react-redux'
import { COLOR, LAYOUT } from "../../constants";
import { Headers } from "../../components";
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

export class LocationScreen extends Component {
  constructor(props) {
    super(props)
    const { location, title, details } = props.navigation.state.params;
    var latitude = parseFloat(location.split(',')[1]);
    var longitude = parseFloat(location.split(',')[0]);
    this.state = {
      title:title?title:'',
      details:details?details:'',
      region: {
        latitude: !isNaN(latitude)?latitude:0.0,
        longitude: !isNaN(longitude)?longitude:0.0,
        latitudeDelta: LAYOUT.LATITUDE_DELTA,
        longitudeDelta: LAYOUT.LONGITUDE_DELTA,
      }
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{position:'absolute', top:0, left:0, zIndex:100, alignItems:'center'}}>
          <Headers 
            screen={()=>this.props.navigation.goBack()} 
            title={'Location'}
            leftLabel={<Ionicons name="ios-arrow-back" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor}/>}
          />
          <View style={{width:LAYOUT.window.width*0.8, marginTop:LAYOUT.window.height*0.03}}>
            <View style={styles.bgP}>
              <View style={styles.inputLeft}>
                <Ionicons name="ios-search" size={LAYOUT.window.width*0.055} color={COLOR.grey1Color} />
              </View>
              <TextInput
                placeholderTextColor={COLOR.placeholderTextColor}
                autoCapitalize="none"
                placeholder='Search location'
                style={[styles.InputBox]}
              />
              <View style={styles.inputLeft}>
                <SimpleLineIcons name="location-pin" size={LAYOUT.window.width*0.05} color={COLOR.redColor} />
              </View>
            </View>
          </View>
        </View>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={this.state.region}
          customMapStyle={[]}
          style={styles.mapView}
        >
          <Marker
            draggable
            coordinate={this.state.region}
            title={this.state.title}
            description={this.state.details}
            pinColor = 'red'
          />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: LAYOUT.window.width,
    height: LAYOUT.window.height
  },
  mapView: {
    width: LAYOUT.window.width,
    height: LAYOUT.window.height
  },
  bgP: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLOR.whiteColor,
    borderRadius: 10,
    width: "auto",
    padding: 11,
    paddingHorizontal: LAYOUT.window.width*0.05,
    marginVertical: LAYOUT.window.height*0.01,
  },    
  inputLeft: {
    paddingHorizontal: LAYOUT.window.width*0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  InputBox: {
    flex: 1,
    height: LAYOUT.window.height*0.036,
    fontSize: LAYOUT.fontSize2,
    paddingHorizontal: LAYOUT.window.width*0.02,
    color: COLOR.blackColor,
    fontWeight: '600',
  },
});

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)
