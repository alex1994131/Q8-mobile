import React from 'react';
import { Root } from "native-base";
import { connect } from 'react-redux'
import GuestNavigation from './navigate/Guest';
import LoggedNavigation from './navigate/Logged';
import WelcomeNavigation from './Welcome';
export class App extends React.Component {
  render() {
    const { authToken, isWelcome, user } = this.props;
    if(!isWelcome){
      return (
        <Root>
          <WelcomeNavigation />
        </Root>
      )
    }else if(authToken&&user) {
      return (
        <Root>
          <LoggedNavigation />
        </Root>
      );
    } else {
      return (
        <Root>
          <GuestNavigation />
        </Root>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  authToken:state.appData.authToken,
  isWelcome:state.appData.isWelcome,
  user:state.auth.user,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
