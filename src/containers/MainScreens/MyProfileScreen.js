import React from 'react';
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Container } from 'native-base';
import Geocoder from 'react-native-geocoding';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { LAYOUT, COLOR, DEV } from "../../constants";
import { Headers, InputBox } from "../../components";
import { userinfoLoad, usersUpdate } from "../../redux/actions/authActions";


export class MyProfileScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id:'',
      img:'',
      username:'',
      fullname:'',
      phone:'',
      location:'',
      mapstate : false,
      isimg : false,
      region: {
        latitude: LAYOUT.LATITUDE,
        longitude: LAYOUT.LONGITUDE,
        latitudeDelta: LAYOUT.LATITUDE_DELTA,
        longitudeDelta: LAYOUT.LONGITUDE_DELTA,
      }
    }
    Geocoder.init(LAYOUT.googleMapsApiKey);
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    if(this.props.user){
      this.initSetstate();
      this.props.userinfoLoad(this.props.user)
    }

    const success = async ({coords}) => {
      const { latitude, longitude } = coords;
      await this.setState({region: { 
        latitude,
        longitude,
        latitudeDelta: LAYOUT.LATITUDE_DELTA,
        longitudeDelta: LAYOUT.LONGITUDE_DELTA,
      }})
    }
    const error = async (err)  => {
      await console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    await navigator.geolocation.watchPosition(success, error, LAYOUT.options);
    await navigator.geolocation.getCurrentPosition(success, error, LAYOUT.options);
  }

  componentDidUpdate(e){
    if(e.user !==this.props.user){
      this.initSetstate();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initSetstate(){
    var { user } = this.props;
    var img = {uri:DEV.IMAGE_URL + (user.img ? user.img : LAYOUT.avatar)};
    this.setState({
      id:user.id,
      img:img,
      username:user.username,
      fullname:user.fullname,
      phone:user.phone,
      location:user.location,
    })
  }

  userSave(){
    var user = this.state;
    const formData = new FormData();
    formData.append('id',user.id)
    formData.append('username',user.username)
    formData.append('fullname',user.fullname)
    formData.append('phone',user.phone)
    formData.append('location',user.location)
    if(this.state.isimg){
      formData.append('image', {
          uri: user.img.uri, 
          type: "image/png", 
          name: Math.random()+'.png',
      });
    }
    this.props.usersUpdate(formData, user.id);
  }

  async _pickImage(){
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ img: result, isimg:true });
      }
    } 
    catch (E) {
      console.log(E);
    }
  };

  getLocation({longitude, latitude}){
    this.setState({location:longitude+","+latitude});
  }

  render(){
    const { img, username, fullname, phone, location, mapstate, region } = this.state;
    return(
      <Container style={styles.container}>
        <Modal visible={mapstate} transparent={true} animationType="slide">
          <MapView
            onMapReady={() =>this.getLocation(region)}
            showsUserLocation={ true }
            followsUserLocation={true}
            region={region}
            showsMyLocationButton={true}
            style={StyleSheet.absoluteFill}
            textStyle={{ color: '#bc8b00' }}
            containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00' }}
          >
            <Marker
              draggable
              coordinate={region}
              title="You are here"
              description="You are here"
              pinColor = 'blue'
              onDragEnd={(e) => this.getLocation(e.nativeEvent.coordinate)}
            />
          </MapView>
          <TouchableOpacity onPress={()=>this.setState({mapstate:!mapstate})} style={{position:'absolute', left:20, top:20}}>
            <Ionicons name="ios-close-circle" size={30} color="black" />
          </TouchableOpacity>
        </Modal>
        <Headers 
          screen={()=>this.props.navigation.openDrawer()} 
          title={'My Profile'}
          leftLabel={<MaterialCommunityIcons name="menu" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor} />}
        />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.profileBox}>
              <TouchableOpacity onPress={()=>this._pickImage()}>
                {img?<Image source={img} style={styles.avatarImage}/>:null}
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <InputBox
                style = {{width:LAYOUT.window.width*0.82}}
                placeholder = 'User Name'
                leftLabel={ <SimpleLineIcons name="user" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                onChangeText={(e)=>this.setState({username:e})}
                value={username}
              />
            </View>
            <View style={styles.box}>
              <InputBox
                style = {{width:LAYOUT.window.width*0.82}}
                placeholder = 'Full Name'
                leftLabel={ <SimpleLineIcons name="user-following" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                onChangeText={(e)=>this.setState({fullname:e})}
                value={fullname}
              />
            </View>
            <View style={styles.box}>
              <InputBox
                style = {{width:LAYOUT.window.width*0.82}}
                placeholder = 'Phone'
                leftLabel={ <SimpleLineIcons name="phone" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                onChangeText={(e)=>this.setState({phone:e})}
                value={phone}
              />
            </View>
            <View style={styles.box}>
              <InputBox
                style = {{width:LAYOUT.window.width*0.82}}
                placeholder = 'Location'
                leftLabel={ <SimpleLineIcons name="map" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                // onChangeText={(e)=>this.setState({location:e})}
                onFocus={()=>this.setState({mapstate:!mapstate})}
                value={location}
              />
            </View>
            <View style={styles.box}>
              <TouchableOpacity onPress={()=>this.userSave()}>
                <LinearGradient
                  start={[1, 1]}
                  end={[0, 0]}
                  colors={COLOR.linearGradientColor}
                  style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>SAVE</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  user:state.auth.user
})

const mapDispatchToProps = {
  userinfoLoad, usersUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen)



const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
    width:LAYOUT.window.width,
  },
  content:{
    paddingVertical:LAYOUT.window.height*0.02,
    height:LAYOUT.window.height*0.905,
    alignItems:'center',
  },
  profileBox:{
    width:LAYOUT.window.width*0.9,
    height:LAYOUT.window.height*0.2,
    alignItems:'center',
    justifyContent:'center',
  },
  avatarImage:{
    width:LAYOUT.window.width*0.3,
    height:LAYOUT.window.width*0.3,
    borderRadius:LAYOUT.window.width*0.15,
    resizeMode:'cover'
  },
  loginButton:{
    padding: LAYOUT.window.width*0.034, 
    margin: LAYOUT.window.width*0.024, 
    alignItems: 'center', 
    borderRadius: LAYOUT.window.width*0.055,
    width:LAYOUT.window.width*0.82,
  },
  loginButtonText:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.fontSize2, 
    textAlign:'center',
  },
  box:{
    marginVertical:LAYOUT.window.height*0.005
  }
})