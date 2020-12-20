import React, { Component } from "react";
import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import theme from "@theme";
import R from "@app/assets/R";

class Empty extends Component {
  render() {
    const { title, description, urlImage, onRefresh, isRefresh,image } = this.props

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: "5%"
          }}
        >
          {!!image&&<Image
            source={R.images.ic_empty_box}
            style={{
              resizeMode: "contain",
              width: theme.dimension.width / 3,
              height: theme.dimension.width / 3,
            }}
          />}
          <Text
            style={[
              theme.fonts.bold16,
              {
                marginTop: 0,
                color: theme.colors.gray,
              }
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              theme.fonts.light16,
              {
                marginTop: 10,
                marginBottom: 10,
                color: 'black',
                textAlign: "center"
              }
            ]}
          >
            {description}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Empty;
