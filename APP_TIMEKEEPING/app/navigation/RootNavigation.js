import React, { Fragment } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import AuthLoadingScreen from "@app/screens/auth/AuthLoadingScreen";
import { LoginScreen } from "@app/screens/auth/LoginScreen";
import HomeScreen from "@app/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationScreen from "@app/screens/notification/NotificationScreen";
import  UserScreen  from "@app/screens/user/UserScreen";
import MainNavigation from "./MainNavigation";
import { connect } from "react-redux";
import TimekeepingOfEmployee from "@app/screens/Timekeeping/TimekeepingOfEmployee";
const RootStack = createStackNavigator();

const RootNavigation = () => {
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
