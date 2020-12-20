import theme from "@app/constants/Theme";
import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl
} from "react-native";
import DatePicker from "react-native-datepicker";
import LinearGradient from "react-native-linear-gradient";
import { getListTimekeeping } from "@api";
import {
  AppHeader,
  Block,
  Button,
  Empty,
  Checkbox,
  BackgroundHeader,
  WindsHeader,
  Icon,
  Loading,
  Error
} from "@component";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import reactotron from "reactotron-react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var date1 = date.getDate();
    this.state = {
      dataFake: [1, 2, 3],
      startDate: year + "-" + month + "-" + "01",
      endDate: year + "-" + month + "-" + date1,
      refreshing: false,
      isLoading: true,
      data: {},
      error: null
    };
  }
  componentDidMount() {
    this.getListTimekeeping();
  }
  getListTimekeeping = async () => {
    const { startDate, endDate } = this.state;

    try {
      this.setState({ isLoading: true });
      const response = await getListTimekeeping(startDate, endDate);
      reactotron.log("response", response);
      this.setState({
        isLoading: false,
        error: false,
        data: response
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true
      });
    }
  };
  _renderInfoItem(title, text) {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginLeft: 20
        }}
      >
        <Text
          style={[
            theme.fonts.medium15,
            {
              color: theme.colors.backgroundHeader,
              width: 120
            }
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            theme.fonts.medium15,
            {
              color: theme.colors.backgroundHeader,
              flex: 1
            }
          ]}
        >
          : {text}
        </Text>
      </View>
    );
  }
  _renderRowTable(item, index) {
    return (
      <View
        style={[
          styles._vColumn,
          {
            backgroundColor:
              index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
          }
        ]}
      
      >
        <View style={[styles.rowTable, { flex: 1 }]}>
          <Text style={theme.fonts.regular14}>{index + 1}</Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text
            style={theme.fonts.regular14}
            // numberOfLines={2}
          >
            {item.date_timekeeping}
          </Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text style={theme.fonts.regular14}>{item.time_checkin}</Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text style={theme.fonts.regular14}>{item.time_checkout}</Text>
        </View>
        <View style={[styles.rowTable, { flex: 2 }]}>
          <Text style={theme.fonts.regular14}>{item.time_late}</Text>
        </View>
      </View>
    );
  }
  _renderTop() {
    const  {data}=this.state
    return (
      <View>
        <View style={styles._viewUser}>
          {this._renderInfoItem("Time late :",data.data.countTimeLate +" minute")}
          {this._renderInfoItem("Day",data.data.countWorkday+ " day ")}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 20,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text>From :</Text>
            <DatePicker
              style={{ width: width * 0.3, marginLeft: 10 }}
              date={this.state.startDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({ startDate: date });
                this.getListTimekeeping()
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text>To :</Text>
            <DatePicker
              style={{ width: width * 0.3, marginLeft: 10 }}
              date={this.state.endDate}
              mode="date"
              placeholder="select date"
              showIcon={false}
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({ endDate: date });
                this.getListTimekeeping()
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={() => {
              //   this.getLocationUser();
              // reactotron.log(this.state.region)
            }}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#ff740d", "#F7D358"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              <Text style={styles.text}>Checkin</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={() => {
              //   this.getLocationUser();
              // reactotron.log(this.state.region)
            }}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#FE2E2E", "#F5A9A9"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              <Text style={styles.text}>Checkout</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={() => {
              //   this.getLocationUser();
              // reactotron.log(this.state.region)
            }}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#0E0771", "#7E6CB5"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              <Text style={styles.text}>Off work</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _renderHeaderTable() {
    return (
      <View>
        <View
          style={[
            styles._vColumn,
            {
              backgroundColor: theme.colors.backgroundBlue,
              borderTopWidth: 0.5,
              borderTopColor: theme.colors.gray,
              marginTop: 10
            }
          ]}
        >
          <View style={[styles.rowTable, { flex: 1 }]}>
            <Text style={theme.fonts.regular14} />
          </View>
          <View style={[styles.rowTable, { flex: 3 }]}>
            <Text
              style={theme.fonts.regular14}
              // numberOfLines={2}
            >
              Date
            </Text>
          </View>
          <View style={[styles.rowTable, { flex: 3 }]}>
            <Text style={theme.fonts.regular14}>Time Checkin</Text>
          </View>
          <View style={[styles.rowTable, { flex: 3 }]}>
            <Text style={theme.fonts.regular14}>Time Checkout</Text>
          </View>
          <View style={[styles.rowTable, { flex: 2 }]}>
            <Text style={theme.fonts.regular14}>Time late</Text>
          </View>
        </View>
      </View>
    );
  }
  _renderBody() {
    const { error, isLoading, data } = this.state;
    reactotron.log("data",data)
    if (error) {
      return (
        <Error
          onPress={() => {
            this.getListTimekeeping();
          }}
        />
      );
    }
    if (isLoading) {
      return <Loading />;
    }
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {this._renderTop()}

        <ScrollView
          contentContainerStyle={{
            width: 550,
            paddingBottom: 10,
            marginTop: 10
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.getListTimekeeping();
              }}
            />
          }
        >
          <ScrollView
            style={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {this._renderHeaderTable()}
            {this.state.data.data.timekeepings.length == 0 ? (
              <Empty description={"No Data"} />
            ) : (
              this.state.data.data.timekeepings.map((item, index) => (
                <View key={index.toString()} style={{ width: "100%" }}>
                  {this._renderRowTable(item, index)}
                </View>
              ))
            )}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
  render() {
    return (
      <Block>
        <SafeAreaView style={theme.styles.containter}>
          <BackgroundHeader />
          <WindsHeader title="List Timekeeping" />
          {this._renderBody()}
        </SafeAreaView>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  _viewUser: {
    // justifyContent:'space-between',
    marginHorizontal: 20,
    marginTop: 40,
    // width:theme.dimension.width*0.9,
    backgroundColor: theme.colors.white,
    paddingVertical: 5,
    // alignItems:'center',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  _viewHeader: {
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5
  },
  rowTable: {
    // flex: 1,
    borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRightColor: theme.colors.gray
  },
  _vColumn: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderLeftColor: theme.colors.gray,
    borderBottomColor: theme.colors.gray,
    marginHorizontal: 20
  },
  bgButton: {
    marginTop: 20,
    height: 43,
    width: theme.dimension.width
  },
  _vDiemDanh: {
    flex: 1,
    backgroundColor: theme.colors.white,
    // width: theme.dimension.width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },
  _lgListClass: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  bgButton: {
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    flexDirection: "row"
  }
});
