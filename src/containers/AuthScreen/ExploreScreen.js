import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { COLOR, LAYOUT } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { setNavigator, navigate } from '../../redux/services/navigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export class ExploreScreen extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email : '',
            password: '',
        }
        setNavigator(props.navigation)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Explore Subscription</Text>
                <Text style={styles.text}>Discounts in Shops</Text>
                <Image source={LAYOUT.logo} style={styles.image}/>
                <View style={styles.buttonBox}>
                    <TouchableOpacity onPress={()=>navigate('SignInScreen')}>
                        <LinearGradient
                            start={[1, 1]}
                            end={[0, 0]}
                            colors={COLOR.linearGradientColor}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>LOG IN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigate('SignUpScreen')}>
                        <LinearGradient
                            start={[1, 1]}
                            end={[0, 0]}
                            colors={COLOR.linearGradientColor}
                            style={styles.createButton}>
                            <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}} onPress={()=>navigate('HomeScreen')}>
                        <Text style={styles.skipButtonText}>&nbsp;&nbsp;&nbsp;Skip&nbsp;&nbsp;&nbsp;</Text>
                        <MaterialCommunityIcons name="hand-pointing-right" style={{marginTop:LAYOUT.window.height*0.01}} color={COLOR.black1Color} size={LAYOUT.window.width*0.07} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:LAYOUT.window.width,
        height:LAYOUT.window.height,
        padding:LAYOUT.window.width*0.1,
        paddingLeft:LAYOUT.window.width*0.15,
        paddingRight:LAYOUT.window.width*0.15,
        alignItems:'center',
    },
    title:{
        fontSize:LAYOUT.fontSize4, 
        color:COLOR.greyColor, 
        fontWeight:"700",
        marginTop:LAYOUT.window.height*0.08, 
        textAlign:'center',
    },
    text:{
        fontSize:LAYOUT.fontSize3, 
        color:COLOR.greyColor, 
        marginTop:LAYOUT.window.height*0.02, 
        textAlign:'center',
    },
    image:{
        width:LAYOUT.window.width*0.35,
        height:LAYOUT.window.width*0.3,
        marginTop:LAYOUT.window.height*0.1,
        resizeMode:'contain'
    },
    buttonBox:{
        width:'100%',
        marginTop:LAYOUT.window.height*0.15, 
        alignItems:'center',
    },
    createButton:{
        padding: LAYOUT.window.width*0.034, 
        alignItems: 'center', 
        borderRadius: LAYOUT.window.width*0.35,
        width:LAYOUT.window.width*0.8,
        margin: LAYOUT.window.width*0.024, 
    },
    createButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize1, 
        textAlign:'center',
    },
    loginButton:{
        padding: LAYOUT.window.width*0.034, 
        margin: LAYOUT.window.width*0.024, 
        alignItems: 'center', 
        borderRadius: LAYOUT.window.width*0.35,
        width:LAYOUT.window.width*0.8,
    },
    loginButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize1, 
        textAlign:'center',
    },
    skipButtonText:{
        marginTop:LAYOUT.window.height*0.01,
        fontSize:LAYOUT.fontSize4, 
        color:COLOR.black1Color, 
        textAlign:'center', 
        fontWeight:'500'
    }
})

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
