import React from 'react';
import Store from './src/redux/Store';
import Router from './src/Router';
import { Provider } from 'react-redux';
import { SplashScreen } from 'expo';

class App extends React.Component{
  
  componentDidMount(){
    SplashScreen.hide();
  }

  render(){
    return (
      <Provider store={Store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
