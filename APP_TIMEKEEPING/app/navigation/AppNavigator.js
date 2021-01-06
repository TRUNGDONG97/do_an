import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import HomeScreen from '@screen/HomeScreen'
import UserScreen from '../screens/user/UserScreen'
import ChangePassWordScreen from '@screen/user/ChangePassWordScreen'
import NotificationScreen from '@screen/notification/NotificationScreen'
import { SCREEN_ROUTER } from '@constant'
import R from '@R';
import theme from "@theme";
import { Icon, ImageViewerScreen } from '@component'
import ChangeUserInfo from '@screen/user/ChangeUserInfo'
import TimekeepingEmployee from '@screen/Timekeeping/TimekeepingEmployee'
import TimekeepingOfEmployee from '@screen/Timekeeping/TimekeepingOfEmployee'
const TabBarComponent = props => <BottomTabBar {...props} />;

const Auth = createStackNavigator({
    [SCREEN_ROUTER.LOGIN]: LoginScreen,
}, {
    defaultNavigationOptions: {
        header: null
    }
})

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName = 'basket';
    let iconSize = focused ? 25 : 20
    switch (routeName) {
        case SCREEN_ROUTER.HOME: {
            iconName = "earth";
            return (
                <Icon.Fontisto name={iconName} size={iconSize} color={tintColor} outline />
            );
        }
        case SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE: {
            iconName = "team";
            return (
                <Icon.AntDesign name={iconName} size={iconSize} color={tintColor} outline />
            );
        }
        case SCREEN_ROUTER.NOTIFICATION: {
            iconName = "bell"
            break
        }
        case SCREEN_ROUTER.USER: {
            iconName = "user"
            break
        }
    }
    return <Icon.SimpleLineIcons name={iconName} size={iconSize} color={tintColor} outline />
};


const Main = createBottomTabNavigator(
    {
        [SCREEN_ROUTER.HOME]: {
            screen: HomeScreen,
            title: "Timekeeping",
            navigationOptions: {
                tabBarLabel:"Timekeeping",
            },
        },
        [SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE]: {
            screen: TimekeepingEmployee,
            title:"Employee",
            navigationOptions: {
                tabBarLabel: "Employee",
            },
        },
        [SCREEN_ROUTER.NOTIFICATION]: {
            screen: NotificationScreen,
            title:"Notification",
            navigationOptions: {
                tabBarLabel: "Notification",
            },
        },
        [SCREEN_ROUTER.USER]: {
            screen: UserScreen,
            title: "User",
            navigationOptions: {
                tabBarLabel: "User",
            },
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeBackgroundColor: theme.colors.bottombarBg,
            inactiveBackgroundColor: theme.colors.bottombarBg,
            inactiveTintColor: theme.colors.inactive,
            activeTintColor: theme.colors.active,
        },
        tabBarComponent: props => {
            return (
                <TabBarComponent
                    {...props}
                    onTabPress={props.onTabPress}
                    style={{
                        borderTopColor: theme.colors.borderTopColor,
                        backgroundColor: theme.colors.primary,
                        height: 58,
                    }}
                />
            );
        },
        initialRouteName: SCREEN_ROUTER.HOME
    }
)

const MainStack = createStackNavigator({
    [SCREEN_ROUTER.MAIN]: Main,
    [SCREEN_ROUTER.HOME]: HomeScreen,
    [SCREEN_ROUTER.CHANGE_PASSWORD]: ChangePassWordScreen,
    [SCREEN_ROUTER.CHANGE_USER_INFO]: ChangeUserInfo,
    [SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE]:TimekeepingEmployee,
    [SCREEN_ROUTER.TIMEKEEPING_OF_EMPLOYEE]:TimekeepingOfEmployee
},
    {
        defaultNavigationOptions: {
            header: null
        }
    }
)


export default createAppContainer(
    createSwitchNavigator({
        [SCREEN_ROUTER.AUTH_LOADING]: AuthLoadingScreen,
        [SCREEN_ROUTER.AUTH]: Auth,
        MainStack,

    },
        {
            initialRouteName: SCREEN_ROUTER.AUTH_LOADING
        }
    )
)
