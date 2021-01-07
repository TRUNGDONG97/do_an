import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
  TextInput,
  BackHandler
} from "react-native";
import DatePicker from "react-native-datepicker";
import LinearGradient from "react-native-linear-gradient";
import {
  getListTimekeeping,
  checkinTimekeeping,
  checkoutTimekeeping,
  workOffTimekeeping
} from "@api";
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
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";
import NetInfo from "@react-native-community/netinfo";
import { LinesLoader } from "react-native-indicator";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-material-dropdown";

import theme from "@app/constants/Theme";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    var month = date.getMonth() + 1;
    var month1 = month.length == 1 ? "0" + month : month;
    var year = date.getFullYear();
    var date1 = date.getDate();
    var date2 = date1.length == 1 ? "0" + date1 : date1;
    this.state = {
      startDate: year + "-" + month1 + "-" + "01",
      endDate: year + "-" + month1 + "-" + date2,
      refreshing: false,
      isLoading: true,
      timeLate: 0,
      dayWork: 0,
      data: [],
      error: null,
      btnLoadingCheckout: false,
      btnLoadingCheckin: false,
      isVisible: false,
      dayOff: year + "-" + month1 + "-" + date2,
      status: 4,
      note: "",
      btnLoadingWorkOff: false
    };
  }

  componentDidMount() {
    this.getListTimekeeping();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    return true;
  };
  getListTimekeeping = async () => {
    const { startDate, endDate } = this.state;

    try {
      this.setState({ isLoading: true });
      const response = await getListTimekeeping(startDate, endDate);
      reactotron.log("response", response);
      if (response.code == 200) {
        this.setState({
          data: response.data.listTimekeeping,
          dayWork: response.data.dayWork,
          timeLate: response.data.timeLate
        });
      }
      this.setState({
        isLoading: false,
        error: false
      });
    } catch (error) {
      Toast.show("Đã có lỗi xảy ra", BACKGROUND_TOAST.FAIL);
      this.setState({
        isLoading: false,
        error: true
      });
    }
  };

  checkin = async () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var date1 = date.getDate();
    this.setState({
      btnLoadingCheckin: true
    });
    var checkConnect = await NetInfo.fetch();
    console.log("checkConnect", checkConnect.details.bssid);
    if (
      !!checkConnect &&
      checkConnect.isWifiEnabled &&
      checkConnect.type == "wifi"
    ) {
      if (
        !checkConnect.details.bssid ||
        checkConnect.details.bssid == "02:00:00:00:00:00"
      ) {
        this.setState({
          btnLoadingCheckin: false
        });
        Toast.show("Bạn chưa lấy được địa chỉ mac", BACKGROUND_TOAST.FAIL);
        return;
      }
      try {
        const response = await checkinTimekeeping({
          address_mac: checkConnect.details.bssid
        });
        reactotron.log(response, "checkin");
        if (response.code == 200) {
          this.setState({
            data: response.data.listTimekeeping,
            dayWork: response.data.dayWork,
            timeLate: response.data.timeLate,
            startDate: year + "-" + month + "-" + "01",
            endDate: year + "-" + month + "-" + date1
          });
        }
        this.setState({
          btnLoadingCheckin: false
        });
      } catch (error) {
        console.log("error", error);
        this.setState({
          btnLoadingCheckin: false
        });
      }
    } else {
      this.setState({
        btnLoadingCheckin: true
      });
      Toast.show("Bạn chưa kết nối wifi", BACKGROUND_TOAST.FAIL);
    }
  };
  checkout = async () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var date1 = date.getDate();
    this.setState({
      btnLoadingCheckout: true
    });
    var checkConnect = await NetInfo.fetch();
    console.log("checkConnect", checkConnect.details.bssid);
    if (
      !!checkConnect &&
      checkConnect.isWifiEnabled &&
      checkConnect.type == "wifi" &&
      checkConnect.details.bssid
    ) {
      try {
        this.setState({
          error: false
        });
        const response = await checkoutTimekeeping({
          address_mac: checkConnect.details.bssid
        });
        reactotron.log(response, "checkin");
        if (response.code == 200) {
          this.setState({
            data: response.data.listTimekeeping,
            dayWork: response.data.dayWork,
            timeLate: response.data.timeLate,
            startDate: year + "-" + month + "-" + "01",
            endDate: year + "-" + month + "-" + date1
          });
        }
        this.setState({
          btnLoadingCheckout: false
        });
      } catch (error) {
        console.log("error", error);
        this.setState({
          btnLoadingCheckout: false
        });
      }
    } else {
      this.setState({
        btnLoadingCheckout: false
      });
      Toast.show("Đã có lỗi xảy ra", BACKGROUND_TOAST.FAIL);
    }
  };
  workOff = async () => {
    const { note, dayOff, status } = this.state;
    try {
      this.setState({
        error: false,
        btnLoadingWorkOff: true
      });
      reactotron.log(dayOff, note, status);
      const response = await workOffTimekeeping({
        note,
        status,
        date: dayOff
      });
      reactotron.log(response, "workOff");
      if (response.code == 200) {
        this.setState({
          data: response.data.listTimekeeping,
          dayWork: response.data.dayWork,
          timeLate: response.data.timeLate,
          startDate: year + "-" + month + "-" + "01",
          endDate: year + "-" + month + "-" + date1
        });
      }
      this.setState({
        btnLoadingWorkOff: false
        // isVisible:false
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        btnLoadingWorkOff: false
        // isVisible:false
      });
    }
    this.setState({
      isVisible: false
    });
  };
  converMinuteToTime = time => {
    var hour = Math.floor(time / 60);
    var minute = time % 60;
    if (hour.toString().length == 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length == 1) {
      minute = "0" + minute;
    }
    return hour + ":" + minute;
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
        <View style={[styles.rowTable, { flex: 4 }]}>
          <Text
            style={theme.fonts.regular14}
            // numberOfLines={2}
          >
            {item.date_timekeeping}
          </Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text style={theme.fonts.regular14}>
            {this.converMinuteToTime(item.time_checkin)}
          </Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text style={theme.fonts.regular14}>
            {this.converMinuteToTime(item.time_checkout)}
          </Text>
        </View>
        <View style={[styles.rowTable, { flex: 2 }]}>
          <Text style={theme.fonts.regular14}>{item.time_late}</Text>
        </View>
        <View style={[styles.rowTable, { flex: 2 }]}>
          <Icon.Octicons
            name="primitive-dot"
            color={item.status == 1 ? theme.colors.green : theme.colors.red}
            size={16}
          />
        </View>
      </View>
    );
  }
  _renderTop() {
    const {
      timeLate,
      dayWork,
      btnLoadingCheckin,
      btnLoadingCheckout
    } = this.state;
    return (
      <View>
        <View style={styles._viewUser}>
          {this._renderInfoItem(
            "Time late :",
            timeLate ? timeLate + " minute" : 0 + " minute"
          )}
          {this._renderInfoItem(
            "Day",
            dayWork ? dayWork + " day " : 0 + " day "
          )}
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
                this.getListTimekeeping();
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
                this.getListTimekeeping();
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            // NavigationUtil.navigate(SCREEN_ROUTER.TIMEKEEPING_EMPLOYEE);
          }}
        >
          <Text>chuyeern man danh sach</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30
          }}
        >
          <TouchableOpacity
            disabled={btnLoadingCheckin}
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={() => {
              this.checkin();
            }}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#ff740d", "#F7D358"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              {btnLoadingCheckin ? (
                <LinesLoader size={20} color="white" />
              ) : (
                <Text style={styles.text}>Check in</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={btnLoadingCheckout}
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={this.checkout}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#FE2E2E", "#F5A9A9"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              {btnLoadingCheckout ? (
                <LinesLoader size={20} color="white" />
              ) : (
                <Text style={styles.text}>Check out</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={() => {
              this.handleVisible();
            }}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#ff740d", "#F7D358"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              <Text style={styles.text}>Work Off</Text>
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
            <Text style={theme.fonts.regular14}>STT</Text>
          </View>
          <View style={[styles.rowTable, { flex: 4 }]}>
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
          <View style={[styles.rowTable, { flex: 2 }]}>
            <Text style={theme.fonts.regular14}>Status</Text>
          </View>
        </View>
      </View>
    );
  }
  _renderBody() {
    const { error, isLoading, data } = this.state;
    // reactotron.log("data", data);
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
            width: 640,
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
            {!data || data.length == 0 ? (
              <Empty description={"No Data"} />
            ) : (
              data.map((item, index) => (
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

  handleVisible = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  choseTypeDayOff = text => {
    this.setState({
      status: text == "Morning" ? 2 : text == "Afternoon" ? 3 : 4
    });
  };
  renderModal() {
    const { isVisible, btnLoadingWorkOff } = this.state;
    let data = [
      {
        id: 2,
        value: "Morning"
      },
      {
        id: 3,
        value: "Afternoon"
      },
      {
        id: 4,
        value: "All Day"
      }
    ];
    return (
      <Modal
        style={{ justifyContent: "center", alignContent: "center" }}
        hasBackdrop
        onBackdropPress={this.handleVisible}
        isVisible={isVisible}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 40,
            borderRadius: 5
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text>Day off :</Text>
            <DatePicker
              style={{ width: width * 0.3, marginLeft: 10 }}
              date={this.state.dayOff}
              mode="date"
              placeholder="select date"
              showIcon={false}
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({ dayOff: date });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ flex: 1 }}>Time Day Off:</Text>
            <Dropdown
              value={"All Day"}
              data={data}
              // dropdownPosition={-3}
              containerStyle={{ flex: 2, marginLeft: 20 }}
              onChangeText={this.choseTypeDayOff}
            />
          </View>
          <TextInput
            style={{
              marginHorizontal: 10,
              borderRadius: 3,
              height: 70,
              marginTop: 40,
              borderWidth: 0.5,
              borderColor: "black",
              fontSize: 14,
              paddingHorizontal: 10
            }}
          />
          <TouchableOpacity
            style={{
              marginTop: 50,
              height: 43,
              width: theme.dimension.width * 0.3,
              backgroundColor: theme.colors.line,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3
            }}
            onPress={this.workOff}
          >
            {btnLoadingWorkOff ? (
              <LinesLoader size={20} color="white" />
            ) : (
              <Text style={styles.text}> Work off</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <Block>
        <SafeAreaView style={theme.styles.containter}>
          <BackgroundHeader />
          <WindsHeader title="List Timekeeping" />
          {this._renderBody()}
          {this.renderModal()}
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    flexDirection: "row"
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
  }
});
