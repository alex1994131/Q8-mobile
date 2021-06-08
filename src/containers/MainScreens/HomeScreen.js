import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { Container } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LAYOUT, COLOR } from "../../constants";
import { SListItem, Headers } from '../../components';
import { navigate, setNavigator } from '../../redux/services/navigator';
import { shopsLoad } from '../../redux/actions/shopsActions';
import { LinearGradient } from 'expo-linear-gradient';

export class HomeScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
    setNavigator(props.navigation)
  }

  componentDidMount(){
    this.props.shopsLoad();
  }

  render(){
    return(
      <Container style={styles.container}>
        <Headers 
          screen={this.props.navigation.openDrawer} 
          title={'Home'}
          leftLabel={<MaterialCommunityIcons name="menu" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor} />}
        />
        <View style={styles.content}>
          <View style={styles.itemList}>
            <ScrollView>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <TouchableOpacity onPress={()=>navigate('OffersScreen', {id:'last', title:'Last'})}>
                  <LinearGradient
                    start={[1, 1]}
                    end={[0, 0]}
                    colors={COLOR.linearGradientColor}
                    style={styles.Button}>
                    <Text style={styles.ButtonText}>Latest Offers</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigate('OffersScreen', {id:'featured', title:'Featured'})}>
                  <LinearGradient
                    start={[1, 1]}
                    end={[0, 0]}
                    colors={COLOR.linearGradientColor}
                    style={styles.Button}>
                    <Text style={styles.ButtonText}>Featured Offers</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                {
                  this.props.shops.map((item, key)=>
                    <SListItem item={item} type={1} key={key}/>
                  )
                }
              </View>
            </ScrollView> 
          </View>
        </View>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  shops:state.shops.shopsData
})

const mapDispatchToProps = {
  shopsLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
    width:LAYOUT.window.width,
  },
  bellIcon:{
    marginLeft:LAYOUT.window.width*0.03
  },
  content:{
    height:LAYOUT.window.height*0.92,
  },
  headerList:{
    minWidth:LAYOUT.window.width,
    height:LAYOUT.window.height*0.07,
    paddingLeft:LAYOUT.window.width*0.04,
    borderBottomWidth:3,
    borderBottomColor:'#F2F2F2',
    alignItems:'center',
    flexDirection:'row',
  },
  itemList:{
    marginHorizontal:LAYOUT.window.width*0.04,
    paddingBottom:LAYOUT.window.height*0.05,
    width:LAYOUT.window.width,
  },
  Button:{
    padding: LAYOUT.window.width*0.035,
    alignItems: 'center', 
    borderRadius: LAYOUT.window.width*0.055,
    width:LAYOUT.window.width*0.41,
    margin: LAYOUT.window.width*0.02, 
  },
  ButtonText:{
      color:COLOR.whiteColor, 
      fontSize:LAYOUT.fontSize1, 
      textAlign:'center',
  },
})
