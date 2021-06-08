import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Container } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { LAYOUT, COLOR,  } from "../../constants";
import { Headers } from "../../components";

export class PrivacyPolicyScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      activeMembership:1
    }
  }
  
  render(){
    return(
      <Container style={styles.container}>
        <Headers 
          screen={()=>this.props.navigation.goBack()} 
          title={'Privacy Policy'}
          leftLabel={<Ionicons name="ios-arrow-back" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor}/>}
        />
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.termP}>
              <Text style={styles.title}>Q8expo a new home for your preowned items.</Text>
              <Text style={styles.desc}>{'Pickup is the responsibility of the acquiring party. Patrons are advised to please, take all necessary safety and security precautions during pickup. \n\nPickup must be done within 7 days of acquisition, except as otherwise agreed with the donor. \n\nAll items not picked up within the stipulated period or as otherwise agreed with the donor will be automatically re-listed. \n\nThe  Q8expo Services are provided “as is” and “as available”, and by using these services, you agree not to hold us liable for things other users do.'}</Text>
            </View>
          </ScrollView>
        </View>
      </Container>
    )
  }
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
    width:LAYOUT.window.width,
  },
  content:{
    height:LAYOUT.window.height*0.905,
    alignItems:'center',
  },
  termP: {
    marginVertical: LAYOUT.window.height*0.01,
    marginHorizontal:LAYOUT.window.width*0.05,
    textAlign:'center'
  },
  title: {
    fontSize: LAYOUT.fontSize6,
    color:COLOR.grey2Color,
  },
  desc: {
    marginTop:LAYOUT.window.height*0.01,
    fontSize: LAYOUT.fontSize4,
    color:COLOR.grey2Color,
  },
})