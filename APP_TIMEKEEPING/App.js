/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import DropdownAlertUtil from '@app/components/DropdownAlertUtil';
import React, { Component } from 'react';
import codePush from "react-native-code-push";
import DropdownAlert from 'react-native-dropdownalert';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { Provider } from "react-redux";
import Reactotron from 'reactotron-react-native';
import NavigationUtil from './app/navigation/NavigationUtil';
import store from "./app/redux/store";
import AppContainer from './app/navigation/AppContainer'
import LoginScreen from './app/screens/auth/LoginScreen';
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
        <DropdownAlert
          ref={alertRef => DropdownAlertUtil.setTopDropdownAlert(alertRef)}
          onTap={DropdownAlertUtil.onTap}
        />
      </Provider>
    )
  }


  // constructor(properties) {
  //   super(properties);
  //   // OneSignal.init("6b13a5c4-571f-4244-b5f6-d220309f4f4d"); // android
  //   OneSignal.init("6b13a5c4-571f-4244-b5f6-d220309f4f4d"); // ios
  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  //   OneSignal.addEventListener('ids', this.onIds);
  //   // OneSignal.configure()
  // }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  // onReceived(notification) {
  //   Reactotron.log("Notification received: ", notification);
  // }

  // onOpened(openResult) {
  //   Reactotron.log('Message: ', openResult.notification.payload.body);
  //   Reactotron.log('Data: ', openResult.notification.payload.additionalData);
  //   Reactotron.log('isActive: ', openResult.notification.isAppInFocus);
  //   Reactotron.log('openResult: ', openResult);
  // }

  // onIds(device) {
  //   Reactotron.log('Device info: ', device);
  // }
  
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};



MyApp = codePush(codePushOptions)(App);

export default MyApp

