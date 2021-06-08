import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Fontisto, Zocial, Entypo } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal'
import { COLOR, LAYOUT } from '../../constants'
import { InputBox } from '../../components';
import { Register } from '../../redux/actions/authActions';
import { validateEmail } from '../../redux/services';
import { navigate } from '../../redux/services/navigator';

export class SignUpScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email : '',
            password: '',
            phone: '',
            countryCode : '',
            country:null,
            isCountryPicker:false,
            role:false
        }
    }

    onSelect = (country) => {
        this.setState({countryCode:country.cca2, country:country.name, isCountryPicker:false})
    }
    
    Register(){
        if(!this.state.email||!validateEmail(this.state.email)){
            alert('Your email address is not valid.')
        }else if(!this.state.password){
            alert('Your password is not valid.')
        }else if(!this.state.countryCode){
            alert('Your country address is not valid.')
        }else if(!this.state.phone){
            alert('Your phone number is not valid.')
        }else if(this.state.role){
            this.props.Register({
                email:this.state.email,
                password:this.state.password,
                phone:this.state.phone,
                country:this.state.country,
                status:'Active',
                role:'Seller',
            })
        }else{
            this.props.Register({
                email:this.state.email,
                password:this.state.password,
                phone:this.state.phone,
                country:this.state.country,
                status:'Active',
                role:'Customer',
            })
            this.state={};
        }
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={LAYOUT.logo} style={styles.image}/>
                    <View style={styles.buttonBox}>
                        <InputBox
                            style = {{width:LAYOUT.window.width*0.8}}
                            placeholder = 'Email Address'
                            leftLabel={ <Zocial name="email" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                            onChangeText={(e)=>this.setState({email:e})}
                            value={this.state.email}
                        />
                        <InputBox
                            style = {{width:LAYOUT.window.width*0.8}}
                            placeholder = 'Password'
                            secureTextEntry={true}
                            leftLabel={ <Fontisto name="key" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                            onChangeText={(e)=>this.setState({password:e})}
                            value={this.state.password}
                        />
                        <View style={{width:LAYOUT.window.width*0.8}}>
                            <View style={styles.bgP}>
                                <View style={styles.InputBox}>
                                    <CountryPicker {...{
                                        onSelect:this.onSelect,
                                        countryCode:this.state.countryCode,
                                        withFilter:true,
                                        withCountryNameButton:true,
                                        withAlphaFilter:false,
                                        withCallingCode:true,
                                        withEmoji:false,
                                        theme:{fontSize:LAYOUT.fontSize2},
                                        containerButtonStyle:{width:'100%', color:COLOR.greyColor, fontSize:LAYOUT.fontSize}
                                    }} visible={this.state.isCountryPicker}
                                    />
                                </View>
                                <TouchableOpacity style={styles.inputLeft} onPress={()=>this.setState({isCountryPicker:!this.state.isCountryPicker})}>
                                    <Entypo name="chevron-thin-down" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <InputBox
                            style = {{width:LAYOUT.window.width*0.8}}
                            placeholder = 'Phone'
                            leftLabel={ <FontAwesome name="phone" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color}  /> }
                            onChangeText={(e)=>this.setState({phone:e})}
                            value={this.state.phone}
                        />
                        <TouchableOpacity style={[styles.radioButton,{marginTop:LAYOUT.window.height*0.01}]} onPress={()=>this.setState({role:!this.state.role})}>
                            {
                                !this.state.role?
                                <LinearGradient
                                    start={[1, 1]}
                                    end={[0, 0]}
                                    colors={COLOR.linearGradient1Color}
                                    style={styles.radioButtonIcon}>
                                </LinearGradient>:
                                <LinearGradient
                                    start={[1, 1]}
                                    end={[0, 0]}
                                    colors={COLOR.linearGradient2Color}
                                    style={styles.radioButtonIconA}>
                                </LinearGradient>
                            }
                            <Text style={styles.radioButtonText}>I'm a Customer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radioButton} onPress={()=>this.setState({role:!this.state.role})}>
                            {
                                this.state.role?
                                <LinearGradient
                                    start={[1, 1]}
                                    end={[0, 0]}
                                    colors={COLOR.linearGradient1Color}
                                    style={styles.radioButtonIcon}>
                                </LinearGradient>:
                                <LinearGradient
                                    start={[1, 1]}
                                    end={[0, 0]}
                                    colors={COLOR.linearGradient2Color}
                                    style={styles.radioButtonIconA}>
                                </LinearGradient>
                            }
                            <Text style={styles.radioButtonText}>I'm a Seller</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.Register()}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.createButton}>
                                <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigate('SignInScreen')}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>LOG IN</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    image:{
        width:LAYOUT.window.width*0.35,
        height:LAYOUT.window.width*0.3,
        marginTop:LAYOUT.window.height*0.04,
        resizeMode:'contain'
    },
    radioButtonIcon:{
        marginHorizontal:LAYOUT.window.width*0.03,
        width:LAYOUT.window.width*0.03,
        height:LAYOUT.window.width*0.03,
        borderRadius:LAYOUT.window.width*0.03,
        borderWidth:1.5,
        borderColor:COLOR.greenColor
    },
    radioButtonIconA:{
        marginHorizontal:LAYOUT.window.width*0.03,
        width:LAYOUT.window.width*0.03,
        height:LAYOUT.window.width*0.03,
        borderRadius:LAYOUT.window.width*0.03,
        borderWidth:1.5,
        borderColor:COLOR.grey1Color
    },
    buttonBox:{
        width:'100%',
        marginTop:LAYOUT.window.height*0.025, 
        alignItems:'center',
    },
    createButton:{
        padding: LAYOUT.window.width*0.034, 
        alignItems: 'center', 
        borderRadius: LAYOUT.window.width*0.055,
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
        borderRadius: LAYOUT.window.width*0.055,
        width:LAYOUT.window.width*0.8,
    },
    loginButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize1, 
        textAlign:'center',
    },
    radioButton:{
        flexDirection:'row',
        width:LAYOUT.window.width*0.8, 
        marginVertical:LAYOUT.window.height*0.005, 
        alignItems:'center',
    },
    radioButtonText:{
        fontSize:LAYOUT.fontSize1, 
        color:COLOR.black1Color, 
        textAlign:'left', 
        fontWeight:'500',
    },
    bgP: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: COLOR.whiteColor,
        borderRadius: 10,
        width: "auto",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        marginVertical: LAYOUT.window.width*0.02,

        shadowOffset: { width: 0, height:5 },
        shadowColor: COLOR.greyColor,
        shadowOpacity: 0.5, 
        shadowRadius: 10,
        elevation:3,
    },    
    inputLeft: {
        width: "auto",
        marginRight: LAYOUT.window.width*0.01,
        justifyContent: "center",
        alignItems: "center",
    },
    InputBox: {
        justifyContent: "center",
        flex: 1,
        height: LAYOUT.window.height*0.04,
        fontSize: LAYOUT.fontSize1,
        fontWeight: '600',
        color: COLOR.blackColor,
    },
})

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    Register
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)