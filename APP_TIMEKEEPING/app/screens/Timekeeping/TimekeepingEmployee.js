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
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";
import LinearGradient from "react-native-linear-gradient";
import { getListTimekeepingDayEmployee } from "@api";
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
import NavigationUtil from "@app/navigation/NavigationUtil";
import theme from "@app/constants/Theme";
export default class TimekeepingEmployee extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    var month = date.getMonth() + 1;
    var month1 = month.length == 1 ? "0" + month : month;
    var year = date.getFullYear();
    var date1 = date.getDate();
    var date2 = date1.length == 1 ? "0" + date1 : date1;
    this.state = {
      refreshing: false,
      isLoading: true,
      data: [],
      error: null,
      dateGet: year + "-" + month1 + "-" + date2,
      btnLoadingCancel:false,
      btnLoadingConfirm:false
    };
  }
  componentDidMount() {
    this.getListTimekeepingDay();
  }
  getListTimekeepingDay = async () => {
    const { dateGet } = this.state;

    try {
      this.setState({ isLoading: true });
      const response = await getListTimekeepingDayEmployee(dateGet);
      reactotron.log("response getListTimekeepingDayEmployee", response.data);
      if (response.code == 200) {
        this.setState({
          data: response.data
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
  render() {
    return (
      <Block>
        <SafeAreaView style={theme.styles.containter}>
        
          <AppHeader title="List Timekeeping Employee" />
          {this._renderBody()}
        </SafeAreaView>
      </Block>
    );
  }
  _renderBody() {
    const { error, isLoading, data,btnLoadingConfirm,btnLoadingCancel } = this.state;
    // reactotron.log("data", data);
    if (error) {
      return (
        <Error
          onPress={() => {
            this.getListTimekeepingDay();
          }}
        />
      );
    }
    if (isLoading) {
      return <Loading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 30,
            marginTop: 20
          }}
        >
          <Text>Day off :</Text>
          <DatePicker
            style={{ width: width * 0.3, marginLeft: 10 }}
            date={this.state.dateGet}
            mode="date"
            placeholder="select date"
            showIcon={false}
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ dateGet: date });
              this.getListTimekeepingDay();
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30
          }}
        >
          <TouchableOpacity
            disabled={btnLoadingConfirm}
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
              {btnLoadingConfirm ? (
                <LinesLoader size={20} color="white" />
              ) : (
                <Text style={styles.text}>Confirm</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={btnLoadingCancel}
            style={{ flex: 1, marginHorizontal: 10, borderRadius: 5 }}
            onPress={this.checkout}
          >
            <LinearGradient
              style={styles.bgButton}
              colors={["#FE2E2E", "#F5A9A9"]}
              start={{ x: 0.7, y: 1 }} //transparent
              end={{ x: 0, y: 0.1 }}
            >
              {btnLoadingCancel ? (
                <LinesLoader size={20} color="white" />
              ) : (
                <Text style={styles.text}>Cancel</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
         
        </View>
        <ScrollView
          contentContainerStyle={{
            width: 700,
            paddingBottom: 10,
            marginTop: 10
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.getListTimekeepingDay();
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
            <Text style={theme.fonts.regular14} numberOfLines={2}>
              Họ tên
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
          <View style={[styles.rowTable, { flex: 1 }]}>
            <Checkbox size={16} status={false} />
          </View>
        </View>
      </View>
    );
  }
  _renderRowTable(item, index) {
    return (
      <TouchableOpacity
        style={[
          styles._vColumn,
          {
            backgroundColor:
              index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
          }
        ]}
        onPress={()=>{
            NavigationUtil.navigate(SCREEN_ROUTER.TIMEKEEPING_OF_EMPLOYEE,{'employee':item.employee})
        }}
      >
        <View style={[styles.rowTable, { flex: 1 }]}>
          <Text style={theme.fonts.regular14}>{index + 1}</Text>
        </View>
        <View style={[styles.rowTable, { flex: 4 }]}>
          <Text
            style={theme.fonts.regular14}
            // numberOfLines={2}
          >
            {item.employee.first_name + " " + item.employee.last_name}
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
        <View style={[styles.rowTable, { flex: 1 }]}>
            <Checkbox size={16} status={false} />
          </View>
      </TouchableOpacity>
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
