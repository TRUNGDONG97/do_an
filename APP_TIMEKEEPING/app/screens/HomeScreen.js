import { BackgroundHeader, Block, Empty, WindsHeader } from "@app/components";
import { SCREEN_ROUTER } from "@app/constants/Constant";
import theme from "@app/constants/Theme";
import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import DatePicker from "react-native-datepicker";
import LinearGradient from "react-native-linear-gradient";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var date1 = date.getDate();
    this.state = {
      data: [1, 2, 3],
      startDate: year + "-" + month + "-" + "01",
      endDate: year + "-" + month + "-" + date1
    };
  }
  _renderInfoItem(title, text) {
    return (
        <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, marginLeft: 20 }}>
            <Text style={[theme.fonts.medium15, {
                color: theme.colors.backgroundHeader,
                width: 120
            }]}>{title}</Text>
            <Text style={[theme.fonts.medium15, {
                color: theme.colors.backgroundHeader,
                flex: 1,
            }]}>:  {text}</Text>

        </View>
    )
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
        onPress={() => {
          // NavigationUtil.navigate(SCREEN_ROUTER.ABSENT_STUDENT, {
          //     class_id: this.state.class_id,
          //     student_id: item.id
          // })
        }}
      >
        <View style={[styles.rowTable, { flex: 1 }]}>
          <Text style={theme.fonts.regular14}>{index + 1}</Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text
            style={theme.fonts.regular14}
            // numberOfLines={2}
          >
            2020-12-17
          </Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text style={theme.fonts.regular14}>08:30:00</Text>
        </View>
        <View style={[styles.rowTable, { flex: 3 }]}>
          <Text style={theme.fonts.regular14}>17:30:00</Text>
        </View>
        <View style={[styles.rowTable, { flex: 2 }]}>
          <Text style={theme.fonts.regular14}>0</Text>
        </View>
      </View>
    );
  }
  _renderBody() {
    return (
      <View
        style={{
          flex: 1
          // justifyContent: 'center',
          // alignItems: 'center'
        }}
      >
          <View style={styles._viewUser}>
                    {this._renderInfoItem('Thời gian muộn :',"10 phút")}
                    {this._renderInfoItem('Số ngày công', "3 ngày ")}
               
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
              <Text style={styles.text}>Take leave</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 20,marginTop:20 }}
        >
          <Text>Từ ngày :</Text>
          <DatePicker
            style={{ width: 200, marginLeft: 28 }}
            date={this.state.startDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            //   minDate="2016-05-01"
            //   maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ startDate: date });
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginTop: 20
          }}
        >
          <Text>Đến ngày :</Text>
          <DatePicker
            style={{ width: 200, marginLeft: 20 }}
            date={this.state.endDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ endDate: date });
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            width: 550,
            // flex: 1
            // backgroundColor:'red'
            paddingBottom: 10,
            marginTop: 10
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView
            style={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
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
            {this.state.data.length == 0 ? (
              <Empty description={"No Data"} />
            ) : (
              this.state.data.map((item, index) => (
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
