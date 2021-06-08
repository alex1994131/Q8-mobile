import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';
import { COLOR, LAYOUT } from '../../constants'
import { navigate } from '../../redux/services/navigator';
import { resetPassword } from '../../redux/actions/authActions';
import { InputBox } from '../../components';
export class ResetpasswordScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            newPassword : '',
            confirmPassword : '',
        }
    }

    resetPassword (){
        if(this.state.newPassword === this.state.confirmPassword){
            this.props.resetPassword(this.state.newPassword);
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.screenTitle}>Reset password</Text>
                    <View style={styles.buttonBox}>
                        <InputBox
                            style = {{width:LAYOUT.window.width*0.8}}
                            placeholder = 'New Password'
                            secureTextEntry={true}
                            leftLabel={ <Fontisto name="key" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                            onChangeText={(e)=>this.setState({newPassword:e})}
                            value={this.state.newPassword}
                            />
                        <InputBox
                            style = {{width:LAYOUT.window.width*0.8}}
                            placeholder = 'Confirm Password'
                            secureTextEntry={true}
                            leftLabel={ <Fontisto name="key" size={LAYOUT.window.width*0.05} color={COLOR.grey1Color} />}
                            onChangeText={(e)=>this.setState({confirmPassword:e})}
                            value={this.state.confirmPassword}
                        />
                        <TouchableOpacity onPress={()=>this.resetPassword()}>
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
        alignItems:'center',
    },
    screenTitle:{
        color:COLOR.grey2Color, 
        marginTop:LAYOUT.window.height*0.19, 
        fontSize:LAYOUT.fontSize5, 
        fontWeight:'600', 
        width:'100%'
    },
    buttonBox:{
        width:'100%',
        marginTop:LAYOUT.window.height*0.06,
        alignItems:'center',
    },
    loginButton:{
        marginTop:LAYOUT.window.height*0.07,
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
})

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    resetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetpasswordScreen)
