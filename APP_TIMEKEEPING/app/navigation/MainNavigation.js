import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREEN_ROUTER, TYPE_LOGIN } from "@app/constants/Constant";
import HomeScreen from "@app/screens/HomeScreen";
import NotificationScreen from "@app/screens/notification/NotificationScreen";
import  UserScreen  from "@app/screens/user/UserScreen";
import TimekeepingEmployee from "@app/screens/Timekeeping/TimekeepingEmployee";
import theme from "@app/constants/Theme";
import { Icon, ImageViewerScreen } from "@component";
import { TouchableOpacity } from "react-native-gesture-handler";
import reactotron from "reactotron-react-native";
const Tab = createBottomTabNavigator();
export default function MainNavigation({ navigation, route }) {
  const { typeLogin } = route.params;
  reactotron.log("typeLogin", typeLogin);
  const getTabBarIcon = (index, focused) => {
    let iconName = "basket";
    let iconSize = focused ? 25 : 20;
    let tintColor = focused ? theme.colors.active : theme.colors.gray2;
    switch (index) {
      case 0: {
        iconName = "earth";
        return (
          <Icon.Fontisto
            name={iconName}
            size={iconSize}
            color={tintColor}
            outline
          />
        );
      }
      case 1: {
        iconName = "team";
        return (
          <Icon.AntDesign
            name={iconName}
            size={iconSize}
            color={tintColor}
            outline
          />
        );
      }
      case 2: {
        iconName = "bell";
        break;
      }
      case 3: {
        iconName = "user";
        break;
      }
    }
    return (
      <Icon.SimpleLineIcons
        name={iconName}
        size={iconSize}
        color={tintColor}
        outline
      />
    );
  };
  const MyTabBar = ({ state, descriptors, navigation }) => {
    reactotron.log("state", state.routes);
    // console.log("descriptors", descriptors);
    // console.log("navigation", navigation);
    return (
      <View
        style={{
          flexDirection: "row",
          height: 58,
          width: "100%",
          backgroundColor: "red"
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            });
          };

          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.border,
                borderTopWidth: 0.5
              }}
            >
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {getTabBarIcon(index, isFocused)}
                <Text
                  numberOfLines={1}
                  style={{
                    color: isFocused
                      ? theme.colors.tintColor
                      : theme.colors.gray2
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        activeBackgroundColor: theme.colors.bottombarBg,
        inactiveBackgroundColor: theme.colors.bottombarBg,
        inactiveTintColor: theme.colors.inactive,
        activeTintColor: theme.colors.active
      }}
      initialRouteName={SCREEN_ROUTER.HOME}
    >
      <Tab.Screen name={SCREEN_ROUTER.HOME} component={HomeScreen} />

      {!!typeLogin && typeLogin == TYPE_LOGIN.LEADER && (
        <Tab.Screen
          name={SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE}
          component={TimekeepingEmployee}
        />
      )}

      <Tab.Screen
        name={SCREEN_ROUTER.NOTIFICATION}
        component={NotificationScreen}
      />
      <Tab.Screen name={SCREEN_ROUTER.USER} component={UserScreen} />
    </Tab.Navigator>
  );
}
