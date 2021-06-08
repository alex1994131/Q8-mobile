import React, {Component} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, LAYOUT, Profile } from '../constants';
import { logOut } from '../redux/actions/authActions';
import { navigate } from '../redux/services/navigator';


class SideMenu extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render () {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={COLOR.linearGradient1Color}
          style={styles.bottom}>
            <Image source={LAYOUT.icon}  style={{ marginVertical:LAYOUT.window.height*0.03, width: LAYOUT.window.width*0.3, height: LAYOUT.window.width*0.3,borderRadius:120}} resizeMode='contain'/>
            <View style={{width:'100%', height:LAYOUT.window.height*0.63}}>
              <ScrollView>
                {
                  Profile.map((item, key)=>(
                    <View key={key}>
                    {
                      (item.role.findIndex(data=>data===(this.props.user&&this.props.authToken?this.props.user.role:'Guest')))>-1 ? 
                      <TouchableOpacity style={styles.profileItemBox} onPress={()=>navigate(item.navLink)}>
                        {item.icon}                    
                        <Text style={styles.profileItemText}>{item.title}</Text>
                      </TouchableOpacity>:null
                    }
                    </View>
                  ))
                }
              </ScrollView>
            </View>
            {this.props.user&&this.props.authToken?
              <TouchableOpacity style={styles.profileItemBox} onPress={()=>this.props.logOut()}>
                <Ionicons name="ios-power" size={LAYOUT.window.width*0.07} style={styles.logoutButtonIcon} />                    
                <Text style={styles.logoutButtonText}>Sign out</Text>
              </TouchableOpacity>
            :null}
          </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex:1,
    width:LAYOUT.window.width*0.7
  },
  content:{
    height:LAYOUT.window.height*0.905,
    alignItems:'center'
  },
  profileBox:{
    width:LAYOUT.window.width*0.9,
    height:LAYOUT.window.height*0.135,
    marginHorizontal:LAYOUT.window.width*0.05,
    marginVertical:LAYOUT.window.height*0.04,
    paddingHorizontal:LAYOUT.window.width*0.05,
    borderRadius:LAYOUT.window.height*0.015,
    alignItems:'center',
    flexDirection:'row',
    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5, 
    shadowRadius: 10,
    elevation:3,
  },
  userNameText:{
    color:COLOR.green2Color,
    fontSize:LAYOUT.window.width*0.04,
    fontWeight:'700'
  },
  userIDText:{
    color:COLOR.grey1Color,
    fontSize:LAYOUT.window.width*0.025,
    fontWeight:'600'
  },
  profileTextBox:{
    paddingHorizontal:LAYOUT.window.width*0.03,
  },  
  modal:{
    width:'100%',
    height:'100%',
    position:'absolute'
  },
  bottom:{
    width:'100%',
    height:LAYOUT.window.height,
    position:'absolute',
    zIndex:10,
    bottom:0,
    alignItems:'center',
    paddingHorizontal:LAYOUT.window.width*0.05,
    paddingVertical:LAYOUT.window.height*0.04,
  },
  avatarImage:{
    width:LAYOUT.window.width*0.15,
    height:LAYOUT.window.width*0.15,
    resizeMode:'cover'
  },
  profileItemBox:{
    width:'100%', 
    height:LAYOUT.window.height*0.048,
    marginVertical:LAYOUT.window.height*0.01,
    alignItems:'center',
    flexDirection:'row',
  },
  profileItemText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.03
  },
  logoutButtonIcon:{
    marginHorizontal:LAYOUT.window.width*0.04,
    textAlign:'center',
    color:COLOR.whiteColor
  },
  logoutButtonText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.035,
  },
})

const mapStateToProps = (state) => ({
  user:state.auth.user,
  authToken:state.appData.authToken,
})

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)