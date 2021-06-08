import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from '../../components/appIntroSlider';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR, LAYOUT, slides } from '../../constants';
import { welcomeDone } from '../../redux/actions/authActions';
import { setNavigator, navigate } from '../../redux/services/navigator';

export class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        setNavigator(props.navigation)
    }
    
    _renderNextButton(){false}
    _renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#26d8ae', '#255da6']}
                    style={styles.linearGradient}
                />
                <Image source={item.image} style={styles.image}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
        </View>
        );
    }
    _onDone = () => {
        this.props.welcomeDone()
    }
    _onSkip = () => {
        this.props.welcomeDone()
    }

    render() {
        return <AppIntroSlider 
            data={slides} 
            onDone={this._onDone}
            showSkipButton={true}
            renderItem={this._renderItem} 
            navigate={()=>navigate('PrivacyPolicyScreen','WelcomeScreen')}
            renderNextButton={this._renderNextButton}
        />;
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    welcomeDone
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)


const styles = StyleSheet.create({
    container: {
        width:LAYOUT.window.width,
        height:LAYOUT.window.height,
        padding:LAYOUT.window.width*0.1,
        paddingLeft:LAYOUT.window.width*0.15,
        paddingRight:LAYOUT.window.width*0.15,
        alignItems:'center', 
    },
    linearGradient:{
        height: LAYOUT.window.height,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    image:{
        width:LAYOUT.window.width*0.3, 
        height:LAYOUT.window.width*0.3, 
        marginTop:LAYOUT.window.height*0.1,
    },
    title:{
        fontSize:LAYOUT.fontSize5, 
        color:COLOR.whiteColor, 
        marginTop:LAYOUT.window.height*0.02, 
        textAlign:'center',
    },
    text:{
        fontSize:LAYOUT.fontSize1, 
        color:COLOR.whiteColor, 
        marginTop:LAYOUT.window.height*0.02, 
        textAlign:'center',
    },
    policyButton:{
        position:'absolute', 
        bottom:LAYOUT.window.height*0.1
    },
    policyButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize3, 
        textAlign:'center',
        textDecorationLine:'underline', 
    },
    skipButtonText:{
        top:LAYOUT.window.height*0.05,
        width:LAYOUT.window.width*0.9,
        textDecorationLine:'underline', 
        fontSize:LAYOUT.fontSize1, 
        color:COLOR.whiteColor, 
        position:'absolute',
        textAlign:'right',
    }
});