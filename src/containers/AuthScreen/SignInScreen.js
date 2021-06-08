import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto, Zocial } from '@expo/vector-icons';
import { COLOR, LAYOUT } from '../../constants'
import { InputBox } from '../../components';
import { login } from '../../redux/actions/authActions';
import { navigate } from '../../redux/services/navigator';
import { validateEmail } from '../../redux/services';
import { Container, Content } from 'native-base';

export class SignInScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email : '',
            password: '',
            mode: 'app',
        }
    }

    login(){
        if(!this.state.email||!validateEmail(this.state.email)){
            alert('Your email address is not valid.')
        }else if(!this.state.password){
            alert('Your password is not valid.')
        }else{
            this.props.login(this.state);
        }
    }
    
    render() {
        return (
            <Container>
                <Content>
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
                            <TouchableOpacity onPress={()=>navigate('ForgetScreen')}>
                                <Text style={styles.forgetButtonText}>Forget Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.login()}>
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
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:LAYOUT.window.width*0.1,
        paddingHorizontal:LAYOUT.window.width*0.15,
        alignItems:'center',
    },
    image:{
        width:LAYOUT.window.width*0.35,
        height:LAYOUT.window.width*0.3,
        marginTop:LAYOUT.window.height*0.05,
        resizeMode:'contain'
    },
    buttonBox:{
        width:'100%',
        marginTop:LAYOUT.window.height*0.115, 
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
    forgetButtonText:{
        marginTop:LAYOUT.window.height*0.04,
        fontSize:LAYOUT.fontSize1, 
        color:COLOR.greyColor, 
        textAlign:'center', 
        fontWeight:'500'
    }
})

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
