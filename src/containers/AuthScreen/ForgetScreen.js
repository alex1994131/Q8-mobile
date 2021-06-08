import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { COLOR, LAYOUT } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { Zocial } from '@expo/vector-icons';
import { navigate } from '../../redux/services/navigator';
import { sendMail } from '../../redux/actions/authActions';
import { InputBox } from '../../components';
export class ForgetScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email : '',
            time:30,
            status:true,
        }
    }
    
    sendMail(){
        if(this.state.email){
            this.setState({email:'', status:false});
            this.props.sendMail({email:this.state.email});
            var counter=setInterval(timer, 1000);
            var me = this;
            function timer()
            {
                me.setState({time:me.state.time-1});
                if (me.state.time <= 0)
                {
                    me.setState({time:30, status:true});
                    clearInterval(counter);
                    return;
                }
            }
        }
    }
    
    render() {
        const {email} =this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.screenTitle}>Forget Password?</Text>
                    <View style={styles.buttonBox}>
                        <InputBox
                            style = {{width:LAYOUT.window.width*0.8}}
                            placeholder = 'Email Address'
                            leftLabel={ <Zocial name="email" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                            onChangeText={(e)=>this.setState({email:e})}
                            value={email}
                        />
                        {
                            this.state.status?
                            <TouchableOpacity onPress={()=>this.sendMail()}>
                                <LinearGradient
                                    start={[1, 1]}
                                    end={[0, 0]}
                                    colors={COLOR.linearGradientColor}
                                    style={styles.getCodeButton}>
                                    <Text style={styles.getCodeButtonText}>GET CODE</Text>
                                </LinearGradient>
                            </TouchableOpacity>:
                            <View>
                                <LinearGradient
                                    start={[1, 1]}
                                    end={[0, 0]}
                                    colors={COLOR.linearGradientColor}
                                    style={styles.getCodeButton}>
                                    <Text style={styles.getCodeButtonText}>GET CODE</Text>
                                </LinearGradient>
                            </View>

                        }
                        <TouchableOpacity onPress={()=>navigate('SignInScreen')}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>LOG IN</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {
                            !this.state.status&&
                            <View style={{width:'100%', alignItems:'flex-end'}}>
                                <TouchableOpacity>
                                    <Text style={styles.resendText}>Resend ({this.state.time}s)</Text>
                                </TouchableOpacity>
                            </View>
                        }
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
        alignItems:'center',
    },
    screenTitle:{
        color:COLOR.grey2Color, 
        marginTop:LAYOUT.window.height*0.22, 
        fontSize:LAYOUT.fontSize5, 
        fontWeight:'600', 
        width:'100%'
    },
    buttonBox:{
        width:'100%',
        marginTop:LAYOUT.window.height*0.07,
        alignItems:'center',
    },
    loginButton:{
        padding: LAYOUT.window.width*0.034, 
        alignItems: 'center', 
        borderRadius: LAYOUT.window.width*0.055,
        width:LAYOUT.window.width*0.8,
        margin: LAYOUT.window.width*0.024, 
    },
    loginButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize1, 
        textAlign:'center',
    },
    getCodeButton:{
        padding: LAYOUT.window.width*0.034, 
        margin: LAYOUT.window.width*0.024, 
        alignItems: 'center', 
        marginTop:LAYOUT.window.height*0.03,
        borderRadius: LAYOUT.window.width*0.055,
        width:LAYOUT.window.width*0.8,
    },
    getCodeButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize1, 
        textAlign:'center',
    },
    resendText:{
        color:COLOR.greyColor, 
        marginTop:LAYOUT.window.height*0.01, 
        fontSize:LAYOUT.fontSize3, 
    }
})

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    sendMail
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetScreen)
