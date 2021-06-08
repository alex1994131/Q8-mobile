import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { COLOR, LAYOUT } from "../constants";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../redux/services/navigator';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from 'native-base';
import { DEV } from '../constants';
import { Video } from 'expo-av';

export const InputBox = (props) => {
    return (
      <View style={props.style}>
        <View style={styles.bgP}>
          <TextInput
            {...props}
            placeholderTextColor={COLOR.placeholderTextColor}
            autoCapitalize="none"
            style={[
              styles.InputBox,
              props.width !== undefined ? props.width : {},
            ]}
          />
          <View style={styles.inputLeft}>
            {props.leftLabel?props.leftLabel:null}
          </View>
        </View>
      </View>
    );
};

export const TextArea = (props) => {
    return (
      <View style={props.style}>
        <View style={styles.bgPT}>
          <TextInput
            {...props}
            multiline
            placeholderTextColor={COLOR.placeholderTextColor}
            autoCapitalize="none"
            style={[
              styles.TextArea,
              props.width !== undefined ? props.width : {},
            ]}
          />
        </View>
      </View>
    );
};

export const ListItem = ({item, type}) =>{
  return(
    <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>navigate('OffersScreen', item)}>
      <View style={[styles.itemListBox,{height:LAYOUT.window.width*(type===2?0.35:0.5)}]}>
        <Image source={{uri:DEV.IMAGE_URL+item.img}} style={styles.itemListImage}/>
        <Text style={styles.itemListTitle}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const SListItem = ({item, type}) =>{
  return(
    <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>navigate('CategoriesScreen', item)}>
      <View style={[styles.itemListBox,{height:LAYOUT.window.width*(type===2?0.35:0.5)}]}>
        <Image source={{uri:DEV.IMAGE_URL+item.img}} style={styles.itemListImage}/>
        <Text style={styles.itemListTitle}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const OfferListItem = ({item, role, Brands, productsDelete}) =>{
  const random = () =>{
    return Math.random()*255
  }
  var brand = Brands.find(data=>parseInt(data.value)===parseInt(item.brand));
  var brands =  brand?brand.label:'';
  var brandimg =  brand?brand.img:'';
  var img =  item.files[0];
  var color = `rgb(${random()},${random()},0)}`;
  var items = Object.assign({}, item,{brand:brands}, {brandimg}, {img}, {color}, {files:item.files})
  var isImage = img.indexOf('.mp4')>-1||img.indexOf('.avi')>-1?false:true;
  if(role==='Seller'){
    return(
      <View style={OfferListItemStyles.OfferListItem}>
        <View style={{borderRadius:LAYOUT.window.width*0.02}}>
          {
            isImage?
            <Image source={{uri:items.img}} style={[OfferListItemStyles.image,{resizeMode:'contain'}]}/>:
              <Video
                source={{uri:items.img}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                // isLooping
                style={OfferListItemStyles.image}
              />
          }
        </View>
        <View>
          <View style={OfferListItemStyles.OfferListTextBox}>
            <Text numberOfLines={1} style={OfferListItemStyles.itemTitle}>{items.title}</Text>
            <Text numberOfLines={1} style={OfferListItemStyles.itemText}>{`By ${items.brand}`}</Text>
            <Text numberOfLines={3} style={OfferListItemStyles.itemDesc}>{items.details}</Text>
          </View>
            <View style={OfferListItemStyles.itemActionBox}>
              <TouchableOpacity style={OfferListItemStyles.actionButton} onPress={()=>navigate('CreateScreen', {state:'update', item})}>
                <FontAwesome name="edit" size={LAYOUT.window.width*0.04} color={COLOR.greyColor} />
                  <Text style={OfferListItemStyles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[OfferListItemStyles.actionButton,{marginLeft:LAYOUT.window.width*0.03}]} onPress={()=>productsDelete(item.id)}>
                <MaterialCommunityIcons name="delete-outline" size={LAYOUT.window.width*0.04} color={COLOR.greyColor} />  
                  <Text style={OfferListItemStyles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={[OfferListItemStyles.itemMark,{backgroundColor:items.color}]}>
          <Text style={OfferListItemStyles.itemPercent}>{items.off}%</Text>
          <Text style={OfferListItemStyles.type}>off</Text>
        </View>
      </View>
    )
  }else{
    return(
      <TouchableOpacity style={OfferListItemStyles.OfferListItem} onPress={()=>navigate('DetailScreen', items)}>
        {
          isImage?
          <Image source={{uri:items.img}} style={[OfferListItemStyles.image, {resizeMode:'contain'}]}/>:
            <Video
              source={{uri:items.img}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              // isLooping
              style={OfferListItemStyles.image}
            />
        }
        <View>
          <View style={OfferListItemStyles.OfferListTextBoxC}>
            <Text numberOfLines={1} style={OfferListItemStyles.itemTitleC}>{items.title}</Text>
            <Text numberOfLines={1} style={OfferListItemStyles.itemTextC}>{`By ${items.brand}`}</Text>
            <Text numberOfLines={3} style={OfferListItemStyles.itemDescC}>{items.details}</Text>
          </View>
        </View>
        <View style={[OfferListItemStyles.itemMarkC,{backgroundColor:items.color}]}>
          <Text style={OfferListItemStyles.itemPercentC}>{items.off}%</Text>
          <Text style={OfferListItemStyles.typeC}>off</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
export const Headers = ({screen, leftLabel, title, rightLabel=null}) =>{
  return(
    <Header style={HeaderStyles.header}>
      <LinearGradient
        start={[1, 1]}
        end={[0, 0]}
        colors={COLOR.linearGradientColor}
        style={HeaderStyles.headerBackground}>
        <TouchableOpacity style={HeaderStyles.headerLeft} onPress={screen}>
          {leftLabel}
        </TouchableOpacity>
        <View style={HeaderStyles.headerCenter}>
          <Text style={HeaderStyles.headerTitle}>{title}</Text>
        </View>
        <View style={HeaderStyles.headerRight}>
          {rightLabel}
        </View>
      </LinearGradient>
    </Header>

  )
}

const HeaderStyles = StyleSheet.create({
  header:{
    backgroundColor:'transparent',
    height:LAYOUT.window.height*0.095,
    width:LAYOUT.window.width,
    borderBottomRightRadius:LAYOUT.window.width*0.06,
    borderBottomLeftRadius:LAYOUT.window.width*0.06,
  },
  headerBackground:{
    width:LAYOUT.window.width,
    flexDirection:'row',
    borderBottomRightRadius:LAYOUT.window.width*0.06,
    borderBottomLeftRadius:LAYOUT.window.width*0.06,
    alignItems:'center',
  },
  headerLeft:{
    width:LAYOUT.window.width*0.2,
    alignItems:'center'
  },
  headerCenter:{
    width:LAYOUT.window.width*0.6, 
    alignItems:'center'
  },
  headerTitle:{
    fontSize:LAYOUT.fontSize5,
    color:COLOR.whiteColor,
    fontWeight:'600',
    alignItems:'center',
    justifyContent:'center'
  },
  headerRight:{
    flexDirection:'row', 
    width:LAYOUT.window.width*0.2, 
    justifyContent:'center'
  },
})
const OfferListItemStyles = StyleSheet.create({
  OfferListItem:{
    paddingHorizontal:LAYOUT.window.width*0.04, 
    paddingVertical:LAYOUT.window.height*0.025, 
    marginVertical:LAYOUT.window.height*0.01, 
    marginHorizontal:LAYOUT.window.width*0.06, 
    width:LAYOUT.window.width*0.88,
    height:LAYOUT.window.width*0.34,
    borderRadius:LAYOUT.window.width*0.04,
    flexDirection:'row',

    backgroundColor:COLOR.whiteColor,
    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5, 
    shadowRadius: 10,
    elevation:3,
  },
  image:{
    width:LAYOUT.window.width*0.35,
    height:'100%',
  },
  OfferListTextBox:{
    width:LAYOUT.window.width*0.35, 
    height:LAYOUT.window.width*0.18,
    marginTop:LAYOUT.window.height*0.008, 
    marginLeft:LAYOUT.window.width*0.04,
  },
  itemTitle:{
    fontSize:LAYOUT.window.width*0.035, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemText:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.025, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemDesc:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.015, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemActionBox:{
    width:LAYOUT.window.width*0.4,
    height:LAYOUT.window.width*0.05,
    marginTop:LAYOUT.window.height*0.01, 
    marginLeft:LAYOUT.window.width*0.04,
    flexDirection:'row', 
    justifyContent:'flex-end', 
    alignItems:'center', 
  },
  actionButton:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center'
  },
  actionButtonText:{
    marginLeft:LAYOUT.window.width*0.005, 
    fontSize:LAYOUT.window.width*0.03, 
    color:COLOR.greyColor
  },
  itemMark:{
    top:LAYOUT.window.width*0.02, 
    right:LAYOUT.window.width*0.02, 
    position:'absolute', 
    width:LAYOUT.window.width*0.065,
    borderRadius:LAYOUT.window.width*0.065, 
    height:LAYOUT.window.width*0.065,
    justifyContent:'center',
    alignItems:'center'
  },
  itemMarkC:{
    top:LAYOUT.window.width*0.025, 
    right:LAYOUT.window.width*0.025, 
    position:'absolute', 
    width:LAYOUT.window.width*0.075,
    borderRadius:LAYOUT.window.width*0.07, 
    height:LAYOUT.window.width*0.075,
    justifyContent:'center',
    alignItems:'center'
  },
  itemPercent:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.02, 
    fontWeight:'700'
  },
  type:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.015
  },
  itemPercentC:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.0225, 
    fontWeight:'700'
  },
  typeC:{
    color:COLOR.whiteColor, 
    fontSize:LAYOUT.window.width*0.02
  },
  OfferListTextBoxC:{
    width:LAYOUT.window.width*0.35, 
    height:LAYOUT.window.width*0.225,
    marginTop:LAYOUT.window.height*0.008, 
    marginLeft:LAYOUT.window.width*0.04,
  },
  itemTitleC:{
    fontSize:LAYOUT.window.width*0.04, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemTextC:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.03, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
  itemDescC:{
    marginTop:5,
    fontSize:LAYOUT.window.width*0.02, 
    fontWeight:'500', 
    color:COLOR.greyColor
  },
})

const styles = StyleSheet.create({
  bgP: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    width: "auto",
    padding: 15,
    paddingLeft: 28,
    paddingRight: 28,
    marginVertical: LAYOUT.window.height*0.01,
    backgroundColor:COLOR.whiteColor,

    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.blackColor,
    shadowOpacity: 0.9, 
    shadowRadius: 10,
    elevation:3,
  },    
  InputBox: {
    flex: 1,
    height: LAYOUT.window.height*0.036,
    fontSize: LAYOUT.fontSize2,
    fontWeight: '600',
    color: COLOR.grey2Color,
  },
  bgPT: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLOR.whiteColor,
    borderRadius: 5,
    width: "auto",
    padding: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: LAYOUT.window.height*0.01,

    shadowOffset: { width: 0, height:5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5, 
    shadowRadius: 10,
    elevation:3,
  },    
  TextArea: {
    flex: 1,
    height: LAYOUT.window.height*0.1,
    fontSize: LAYOUT.fontSize3,
    textAlignVertical:'top',
    fontWeight: '600',
    color: COLOR.grey2Color,
  },
  inputLeft: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  itemListBox:{
    marginVertical:LAYOUT.window.height*0.01,
    marginHorizontal:LAYOUT.window.width*0.02,
    width:LAYOUT.window.width*0.42,
    borderRadius:LAYOUT.window.width*0.05,
    justifyContent:'center',
    alignItems:'center'
  },
  itemListImage:{
    resizeMode:'cover',
    borderRadius:LAYOUT.window.width*0.05, 
    width:'100%', 
    height:'100%'
  },
  itemListTitle:{
    paddingHorizontal:LAYOUT.window.width*0.06,
    position:'absolute', 
    width:'100%', 
    fontWeight:'600', 
    color:COLOR.whiteColor, 
    textAlign:'center', 
    fontSize:LAYOUT.fontSize5
  },
  headerListItem:{
    marginHorizontal:LAYOUT.window.width*0.01,
    paddingHorizontal:LAYOUT.window.width*0.03,
    paddingVertical:LAYOUT.window.height*0.006,
    borderRadius:LAYOUT.window.width*0.05,
    borderColor:COLOR.greenColor,
    borderWidth:2,
    textAlign:'center',
    fontWeight:'600',
    color:COLOR.grey3Color,
  }
})