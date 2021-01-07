import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import HomeScreen from "@app/screens/HomeScreen";
import NotificationScreen from "@app/screens/notification/NotificationScreen";
import { UserScreen } from "@app/screens/user/UserScreen";
import TimekeepingEmployee from "@app/screens/Timekeeping/TimekeepingEmployee";
import theme from "@app/constants/Theme";
import { Icon, ImageViewerScreen } from "@component";
import { TouchableOpacity } from "react-native-gesture-handler";
const Tab = createBottomTabNavigator();
export default function MainNavigation({ navigation,route }) {
  const{typeLogin}= route.params.typeLogin

  const getTabBarIcon = (name, focused, tintColor) => {
    let iconName = "basket";
    let iconSize = focused ? 25 : 20;
    switch (name) {
      case SCREEN_ROUTER.HOME: {
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
      case SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE: {
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
      case SCREEN_ROUTER.NOTIFICATION: {
        iconName = "bell";
        break;
      }
      case SCREEN_ROUTER.USER: {
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
    console.log("state", state.routes);
    // console.log("descriptors", descriptors);
    // console.log("navigation", navigation);
    return (
      <View
        style={{
          flexDirection: "row",
          height: 58,
          width: "100%"
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
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                borderTopColor: theme.colors.borderTopColor,
                backgroundColor: theme.colors.primary,
                height: 58
              }}
            >
              <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                {label}
              </Text>
            </TouchableOpacity>
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

      <Tab.Screen
        name={SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE}
        component={TimekeepingEmployee}
      />

      <Tab.Screen
        name={SCREEN_ROUTER.NOTIFICATION}
        component={NotificationScreen}
      />
      <Tab.Screen name={SCREEN_ROUTER.USER} component={UserScreen} />
    </Tab.Navigator>
  );
}
