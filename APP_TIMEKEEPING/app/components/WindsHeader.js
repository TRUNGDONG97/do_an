import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "./Icon";
import theme from "@theme";
import PropTypes from "prop-types";
import { SCREEN_ROUTER } from "../constants/Constant";

class WindsHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hideBackButton: PropTypes.bool,
    rightComponent: PropTypes.element
  };
  static defaultProps = {
    hideBackButton: false,
    rightComponent: null
  };

  render() {
    const {
      title,
      showBackButton,
      backAction,
      rightComponent,
      navigation,
      onPress,
      showSearchButton,
      postButton,
      updateButton,
      showFilter,
      ...props
    } = this.props;

    return (
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginTop: Platform.OS == "android" ? 30 : 10,
          marginBottom: Platform.OS == "android" ? 0 : 15
        }}
      >
        {showBackButton && (
          <TouchableOpacity
            style={{ position: "absolute", left: 20 }}
            onPress={() => this.props.navigation.goBack()}
          >
          <Icon.AntDesign
                  name="left"
                  size={25}
                  color={theme.colors.white}
                />
          </TouchableOpacity>
        )}
        <Text
          style={[
            theme.fonts.bold22,
            {
              color: "white"
            }
          ]}
        >
          {title}
        </Text>
        {showSearchButton && (
          <TouchableOpacity
            style={{ position: "absolute", right: 20 }}
            onPress={onPress}
          >
            <Icon.FontAwesome5 name="search" size={25} color="#fff" />
          </TouchableOpacity>
        )}
        {showFilter && (
          <TouchableOpacity
            style={{ position: "absolute", right: 20 }}
            onPress={onPress}
          >
            <Icon.FontAwesome name="filter" size={25} color="#fff" />
          </TouchableOpacity>
        )}
        {postButton && (
          <TouchableOpacity
            style={{ position: "absolute", right: 20 }}
            onPress={onPress}
          >
            <Text style={[theme.fonts.bold20, { color: theme.colors.white }]}>
              Đăng
            </Text>
          </TouchableOpacity>
        )}
        {updateButton && (
          <TouchableOpacity
            style={{ position: "absolute", right: 20 }}
            onPress={onPress}
          >
            <Text style={[theme.fonts.bold20, { color: theme.colors.white }]}>
              Cập nhật
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default WindsHeader;
