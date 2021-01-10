import React, { Fragment, useEffect } from "react";
import { View, Text ,AppState} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import AuthLoadingScreen from "@app/screens/auth/AuthLoadingScreen";
import { LoginScreen } from "@app/screens/auth/LoginScreen";
import HomeScreen from "@app/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationScreen from "@app/screens/notification/NotificationScreen";
import UserScreen from "@app/screens/user/UserScreen";
import MainNavigation from "./MainNavigation";
import { connect } from "react-redux";
import TimekeepingOfEmployee from "@app/screens/Timekeeping/TimekeepingOfEmployee";
import ChangeUserInfo from "@app/screens/user/ChangeUserInfo";
import ChangePassWordScreen from "@app/screens/user/ChangePassWordScreen";
import OneSignal from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RootStack = createStackNavigator();
// OneSignal.init("6b13a5c4-571f-4244-b5f6-d220309f4f4d"); // android
const RootNavigation = () => {
  OneSignal.init("a3a7b8e7-3607-4ed1-9066-3a8e98e9ce86"); //  app id
  // reactotron.log('sadasdasda')
  OneSignal.addEventListener("received", onReceived);
  OneSignal.addEventListener("opened", onOpened);
  OneSignal.addEventListener("ids", onIds);
  // OneSignal.configure();
  AppState.addEventListener("change", state => {

  });
  useEffect(() => {
    
    return () => {
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    }
  }, [])
  const onOpened = (openResult) => {

    return;
  }
 const  onReceived = () => {
    // reactotron.log("Notification received: ", notification);
  }

  const onIds = async (device) => {
    if (device) {
      if (!!device.userId)
        await AsyncStorage.setItem("Device info: ", device.userId)
    }
    reactotron.log("Device info: ", device);
  }
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator headerMode={"none"}>
          <RootStack.Screen
            name={SCREEN_ROUTER.AUTH_LOADING}
            component={AuthLoadingScreen}
          />
          <RootStack.Screen
            name={SCREEN_ROUTER.LOGIN}
            component={LoginScreen}
          />
          <RootStack.Screen
            name={SCREEN_ROUTER.MAIN}
            component={MainNavigation}
          />
          <RootStack.Screen
            name={SCREEN_ROUTER.TIMEKEEPING_OF_EMPLOYEE}
            component={TimekeepingOfEmployee}
          />
          <RootStack.Screen
            name={SCREEN_ROUTER.CHANGE_USER_INFO}
            component={ChangeUserInfo}
          />
          <RootStack.Screen
            name={SCREEN_ROUTER.CHANGE_PASSWORD}
            component={ChangePassWordScreen}
          />

        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootNavigation);
