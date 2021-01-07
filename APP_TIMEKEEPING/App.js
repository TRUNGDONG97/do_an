/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import codePush from "react-native-code-push";
// import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { Provider } from "react-redux";
import Reactotron from "reactotron-react-native";
import store from "./app/redux/store";
import RootNavigation from "@app/navigation/RootNavigation";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};

MyApp = codePush(codePushOptions)(App);

export default MyApp;
