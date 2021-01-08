import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Image
} from "react-native";
import R from "@R";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import { FastImage, Block } from "@app/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reactotron from "reactotron-react-native";
import { connect } from "react-redux";
// import dsds from  ""
export class AuthLoadingScreen extends Component {
  componentDidMount() {
    // load something and check login
    setTimeout(() => {
      this.handleActiveApp();
    }, 1500);
  }

  handleActiveApp = async () => {
    let token = await AsyncStorage.getItem("token");
    // reactotron.log("token",token)
    if (!!token) {
      let typeLogin = await AsyncStorage.getItem("typeLogin");
      console.log("typeLogin", typeLogin);
      this.props.navigation.navigate(SCREEN_ROUTER.MAIN, {
        typeLogin
      });
    } else {
      this.props.navigation.navigate(SCREEN_ROUTER.LOGIN);
    }
  };

  render() {
    return (
      <Block>
        <Image
          source={R.images.img_splash}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"cover"}
        />
      </Block>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
