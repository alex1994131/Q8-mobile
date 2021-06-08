import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LinearGradient } from 'expo-linear-gradient';
import { AirbnbRating } from 'react-native-elements';
import { Container } from 'native-base';
import { Video } from 'expo-av';
import { LAYOUT, COLOR, DEV } from "../../constants";
import { Headers } from "../../components";
import { navigate } from '../../redux/services/navigator';
import * as Linking from 'expo-linking';

export class DetailScreen extends React.Component{
  constructor(props) {
    super(props)
    let AllData = props.navigation.state.params?props.navigation.state.params:{};
    this.state = {
       AllData:AllData,
       files:AllData.files,
       isOpen:false,
       imagestate:false,
       imageData:[]
    }
  }

  componentDidMount(){
    
  }

  imgView(){
    var imgA = [];
    for(let i in this.state.files){
      var data = {
        url: this.state.files[i],
        props: {}
      }
      imgA.push(data);
    }
    this.setState({imageData:imgA})
    this.setState({imagestate:!this.state.imagestate})
  }
  
  render(){
    const { number, price, img, color, off, title, brand, details, rating, brandimg, operation_time, link, qrcode } = this.state.AllData;
    var isImage = img.indexOf('.mp4')>-1||img.indexOf('.avi')>-1?false:true;
    return(
      <Container style={styles.container}>
        <Modal visible={this.state.imagestate} transparent={true} animationType="slide">
          <ImageViewer imageUrls={this.state.imageData}/>
          <TouchableOpacity onPress={()=>this.setState({imagestate:!this.state.imagestate})} style={{position:'absolute', right:20, top:20}}>
            <Ionicons name="ios-close-circle" size={30} color="white" />
          </TouchableOpacity>
        </Modal>
        <Headers 
          screen={()=>this.props.navigation.goBack()} 
          title={'Offer Details'}
          leftLabel={<Ionicons name="ios-arrow-back" size={LAYOUT.window.width*0.06} color={COLOR.whiteColor}/>}
          rightLabel={
            <><TouchableOpacity>
              <Ionicons name="md-heart" style={{marginTop:2}} size={LAYOUT.window.width*0.05} color={COLOR.whiteColor}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons style={styles.bellIcon} name="bell-ring" size={LAYOUT.window.width*0.05} color={COLOR.whiteColor} />
            </TouchableOpacity></>
          }
        />
        <View style={styles.content}>
          <View style={styles.headerList}>
            <View style={styles.headerListTitle}>
              <Text numberOfLines={1} style={styles.headerListTitleText}>{title}</Text>
              <LinearGradient
                start={[1, 1]}
                end={[0, 0]}
                colors={COLOR.linearGradientColor}
                style={styles.rightBorder}>
              </LinearGradient>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity style={styles.filterButton}>
                <Fontisto name="share" size={LAYOUT.window.width*0.04} color={COLOR.greyColor} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.itemList}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
              <TouchableOpacity style={styles.imageBox} onPress={()=>this.imgView()}>
                {
                  isImage?
                  <Image source={{uri:img}} style={[styles.image,{resizeMode:'contain'}]}/>:
                    <Video
                      source={{uri:img}}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      shouldPlay
                      isLooping
                      style={styles.image}
                    />
                }
              </TouchableOpacity>
              <View style={[styles.itemMarkC,{backgroundColor:color}]}>
                <Text style={styles.itemPercentC}>{off}</Text>
                <Text style={styles.typeC}>Off</Text>
              </View>
              <View style={styles.markReviewBox}>
                <View style={styles.markBox}>
                  <Image source={{uri:brandimg}} style={styles.brandimg}/>
                </View>
                <AirbnbRating
                  showRating={false}
                  defaultRating={rating}
                  size={LAYOUT.window.width*0.04}
                />
              </View>
              <View style={styles.TextBox}>
                <Text numberOfLines={1} style={styles.itemTitle}>{title}</Text>
                <Text numberOfLines={1} style={styles.itemText}>{brand}</Text>
                <Text numberOfLines={3} style={styles.itemDesc}>{details}</Text>
                <Text numberOfLines={1} style={[styles.itemDesc,{color:COLOR.blueColor}]}>{price} USD</Text>
                <TouchableOpacity onPress={()=>Linking.openURL(link)}>
                  <Text numberOfLines={1} style={[styles.itemDesc,{color:COLOR.blueColor}]}>{link}</Text>
                </TouchableOpacity>
                <View style={[styles.timeBox,{marginTop:LAYOUT.window.height*0.015}]}>
                  <View style={{flexDirection:'row'}}>
                    <Text numberOfLines={1} style={styles.itemDesc}>Service time: </Text>
                    <Text numberOfLines={1} style={[styles.itemDesc,{color:COLOR.pinkColor}]}>{operation_time}</Text>
                  </View>
                  <TouchableOpacity style={styles.pathBox} onPress={()=>navigate('LocationScreen', this.state.AllData)}>
                    <Image source={LAYOUT.path} style={styles.pathImage}/>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={()=>this.setState({isOpen:!this.state.isOpen})}>
                <LinearGradient
                  start={[1, 1]}
                  end={[0, 0]}
                  colors={COLOR.linearGradientColor}
                  style={styles.getOfferButton}>
                    <View>
                      <Text style={styles.getOfferButtonText1}>Get Offer</Text>
                      <Text style={styles.getOfferButtonText2}>Scan to avail the offer</Text>
                    </View>
                    {qrcode&&<Image source={{uri:DEV.IMAGE_URL+qrcode}} style={styles.qrcodeImage}/>}
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        {this.state.isOpen?
          <View style={styles.modal}>
            <TouchableOpacity onPress={()=>this.setState({isOpen:!this.state.isOpen})} style={styles.modalClose}></TouchableOpacity>
            <LinearGradient
              start={[1, 1]}
              end={[0, 0]}
              colors={COLOR.linearGradientColor}
              style={styles.bottom}>
                <Text style={styles.modalTitle}>{title}</Text>
                {qrcode&&<Image source={{uri:DEV.IMAGE_URL+qrcode}} style={styles.qrcode1Image}/>}
                <Text style={styles.modalNumberText}>{number}</Text>
                <Text style={styles.modalDescText}>{details}</Text>
            </LinearGradient>
        </View>:null}
      </Container>
    )
  }
}

export default DetailScreen

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
    width:LAYOUT.window.width,
  },
  bellIcon:{
    marginLeft:LAYOUT.window.width*0.03
  },
  content:{
    height:LAYOUT.window.height*0.905,
    alignItems:'center'
  },
  headerList:{
    height:LAYOUT.window.height*0.07,
    width:LAYOUT.window.width,
    paddingLeft:LAYOUT.window.width*0.04,
    borderBottomWidth:2,
    borderBottomColor:'#F2F2F2',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  itemList:{
    marginHorizontal:LAYOUT.window.width*0.05,
    height:LAYOUT.window.height*0.8,
    width:LAYOUT.window.width*0.9,
    alignItems:'center',
  },
  rightBorder:{
    width:'100%',
    height:3,
    borderRadius:1,
    alignItems:'center',
  },
  filterButton:{
    width: LAYOUT.window.width*0.2,
    alignItems:'center',
    backgroundColor: COLOR.whiteColor,
  },
  headerListTitle:{
    marginLeft:LAYOUT.window.width*0.04, 
    height:LAYOUT.window.height*0.07, 
    justifyContent:'center', 
    alignItems:'center'
  },
  headerListTitleText:{
    maxWidth:LAYOUT.window.width*0.72 ,
    height:LAYOUT.window.height*0.045 ,
    marginTop:LAYOUT.window.height*0.025, 
    color:COLOR.greyColor, 
    fontSize:LAYOUT.window.width*0.03
  },
  imageBox:{
    marginTop:LAYOUT.window.height*0.02,
    width:LAYOUT.window.width*0.9,  
    borderRadius:LAYOUT.window.width*0.05,  
    height:LAYOUT.window.width*0.37,
  },
  image:{
    width:LAYOUT.window.width*0.9,  
    height:LAYOUT.window.width*0.37,
  },
  brandimg:{
    width:LAYOUT.window.width*0.2,  
    height:LAYOUT.window.width*0.08,
    resizeMode:'contain',
  },
  getOfferButton:{
    width:LAYOUT.window.width*0.895,
    height:LAYOUT.window.height*0.17,
    padding: LAYOUT.window.width*0.05, 
    marginVertical: LAYOUT.window.height*0.02,
    borderRadius: LAYOUT.window.width*0.05,
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  getOfferButtonText1:{
    fontSize:LAYOUT.window.width*0.04, 
    color:COLOR.whiteColor,
    fontWeight:'700', 
  },
  getOfferButtonText2:{
    fontSize:LAYOUT.window.width*0.02, 
    color:COLOR.whiteColor,
  },
  itemTitle:{
    fontSize:LAYOUT.window.width*0.045, 
    color:COLOR.greyColor,
    fontWeight:'700', 
  },
  itemText:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.035, 
    fontWeight:'600', 
    color:COLOR.greyColor
  },
  itemDesc:{
    fontSize:LAYOUT.window.width*0.03, 
    fontWeight:'600', 
    color:COLOR.greyColor
  },
  pathImage:{
    resizeMode:'contain',
    alignItems:'center',
    width:LAYOUT.window.width*0.05, 
    height:LAYOUT.window.width*0.05, 
  },
  markReviewBox:{
    width:'100%', 
    height:LAYOUT.window.height*0.06,
    marginVertical:LAYOUT.window.height*0.01,
    paddingHorizontal:LAYOUT.window.width*0.03,
    justifyContent:'space-between',
    flexDirection:'row', 
    alignItems:'center', 
  },
  markBox:{
    alignItems:'center', 
    justifyContent:'center'
  },
  markTopBox:{
    width:LAYOUT.window.width*0.07, 
    alignItems:'center', 
    borderWidth:2, 
    borderColor:COLOR.green1Color,
    borderRadius:LAYOUT.window.width*0.03, 
  },
  markTopText:{
    fontSize:LAYOUT.window.width*0.03, 
    color:COLOR.green1Color, 
    fontWeight:'bold'
  },
  markBottomText:{
    fontSize:LAYOUT.window.width*0.025, 
    color:COLOR.green1Color, 
    fontWeight:'700',
  },
  TextBox:{
    width:'100%', 
    height:LAYOUT.window.height*0.25,
    paddingHorizontal:LAYOUT.window.width*0.03,
    overflow:'hidden'
  },
  timeBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  pathBox:{
    alignItems:'center',
    justifyContent:'center',
  },
  qrcodeImage:{
    width:LAYOUT.window.width*0.17,
    height:LAYOUT.window.width*0.17,
    resizeMode:'cover'
  },



  modal:{
    width:'100%',
    height:'100%',
    position:'absolute'
  },
  bottom:{
    width:'100%',
    height:LAYOUT.window.height*0.6,
    position:'absolute',
    zIndex:10,
    bottom:0,
    borderTopLeftRadius:LAYOUT.window.height*0.04,
    borderTopRightRadius:LAYOUT.window.height*0.04,
    alignItems:'center'
  },
  modalClose:{
    backgroundColor:COLOR.blue1Color, 
    height:'100%', 
    width:'100%'
  },
  modalTitle:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.045,
    fontWeight:'700',
    textAlign:'center',
    marginTop:LAYOUT.window.height*0.09,
    marginBottom:LAYOUT.window.height*0.05,
  },
  modalNumberText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.04,
    fontWeight:'500',
    marginTop:LAYOUT.window.height*0.015,
  },
  modalDescText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.025,
    fontWeight:'500',
    marginTop:LAYOUT.window.height*0.03,
    marginHorizontal:LAYOUT.window.height*0.05
  },
  qrcode1Image:{
    width:LAYOUT.window.width*0.26,
    height:LAYOUT.window.width*0.26,
    resizeMode:'cover'
  },
  itemMarkC:{
    top:LAYOUT.window.width*0.025, 
    right:LAYOUT.window.width*0.025, 
    position:'absolute', 
    width:LAYOUT.window.width*0.1,
    borderRadius:LAYOUT.window.width*0.07, 
    height:LAYOUT.window.width*0.1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemPercentC:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.03, 
    fontWeight:'700'
  },
  typeC:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.02
  },
})