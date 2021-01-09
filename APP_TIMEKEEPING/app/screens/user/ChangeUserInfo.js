import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import {
  Block,
  WindsHeader,
  BackgroundHeader,
  Loading,
  FastImage,
  Icon,
  Content,
  Button,
  LabelTextInput,
  Checked,
  AppHeader
} from "@component";
import R from "@R";
import theme from "@theme";
import { SCREEN_ROUTER, GENDER } from "@app/constants/Constant";
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";
import { showMessages } from "@app/utils/Alert";
import reactotron from "reactotron-react-native";
import { updateUser } from "@app/redux/actions";

import DatePicker from "react-native-datepicker";
export class ChangeUserInfo extends Component {
  constructor(props) {
    super(props);
    const { UserInfoState } = this.props;
    // console.log(UserInfoState.data.sex)
    this.state = {
      phone: UserInfoState.data.phone,
      email: UserInfoState.data.email,
      address: UserInfoState.data.address,
      birthday: UserInfoState.data.birthday,
      gender: UserInfoState.data.sex
    };
  }
  // state = {
  //     isLoading: false,
  //     error: null,
  //     data: {},
  //     phone: "",
  //     address: "",
  //     sex: "",
  //     email:''
  // };

  render() {
    return (
      <Block>
        <AppHeader title="Change Infomation" navigation={this.props.navigation}/>
        <SafeAreaView style={theme.styles.containter}>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flexGrow: 1 }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 20,
                flexGrow: 1
              }}
              showsVerticalScrollIndicator={false}
            >
              {this._renderBody()}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Block>
    );
  }
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
  _renderBody() {
    const { UserInfoState } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            // alignItems: "center",
            // justifyContent: "center",
            flex: 1
          }}
        >
          <View style={styles._viewUser}>
            {this._renderInfoItem(
              "Name:",
              UserInfoState.data.first_name + " " + UserInfoState.data.last_name
            )}
            {this._renderInfoItem("Id", UserInfoState.data.employee_code)}
          </View>
          {/* {this.state.isLoading && <LoadingProgressBar />} */}
          <LabelTextInput
            label="Phone"
            onChangeText={text => this.setState({ phone: text })}
            keyboardType="phone-pad"
            value={this.state.phone}
            // secureTextEntry={true}
            placeholder="Số điện thoại"
          />
          <LabelTextInput
            label="Email"
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            value={this.state.email}
            secureTextEntry={true}
            placeholder="Email"
          />
          <View style={styles._viewBirth}>
            <Text
              style={[theme.fonts.regular16, { flex: 1, color: "#0b4369" }]}
            >
              Birthday:
            </Text>
            <View style={{ flex: 2 }}>
              <View style={styles._viewDate}>
                <DatePicker
                  date={this.state.birthday}
                  mode="date"
                  showIcon={true}
                  androidMode="spinner"
                  placeholderText={theme.fonts.robotoRegular16}
                  format="DD/MM/YYYY"
                  minDate="01/01/1950"
                  maxDate="01/01/2500"
                  confirmBtnText={"Confirm"}
                  cancelBtnText={"Cancel"}
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      borderBottomColor: 0,
                      justifyContent: "center"
                    },
                    dateText: [
                      theme.fonts.robotoRegular16,
                      {
                        color: theme.colors.black
                      }
                    ],
                    placeholderText: [
                      theme.fonts.robotoRegular16,
                      {
                        color: theme.colors.black
                      }
                    ]
                  }}
                  onDateChange={date => {
                    this.setState({
                      ...this.state,
                      birthday: date
                    });
                  }}
                />
                <FastImage
                  style={{ height: 20, width: 20 }}
                  source={R.images.ic_date}
                />
              </View>
            </View>
          </View>
          <View style={styles._viewGender}>
            <Text style={[theme.fonts.regular16, { color: "#0b4369" }]}>
              Genner
            </Text>
            <View style={{ flex: 2, flexDirection: "row" }}>
              <Checked
                left={60}
                text="Nam"
                status={this.state.gender == GENDER.MALE}
                onPress={() => {
                  this.state.gender == GENDER.MALE
                    ? this.setState({
                        ...this.state,
                        gender: GENDER.FEMALE
                      })
                    : this.setState({
                        ...this.state,
                        gender: GENDER.MALE
                      });
                }}
              />
              <Checked
                left={40}
                text="Nữ"
                status={this.state.gender == GENDER.FEMALE}
                onPress={() => {
                  this.state.gender == GENDER.MALE
                    ? this.setState({
                        ...this.state,
                        gender: GENDER.FEMALE
                      })
                    : this.setState({
                        ...this.state,
                        gender: GENDER.MALE
                      });
                }}
              />
            </View>
          </View>
          <LabelTextInput
            label="Address"
            onChangeText={text => this.setState({ address: text })}
            value={this.state.address}
            secureTextEntry={true}
            placeholder="Địa chỉ"
          />
          <Button
            style={{ alignSelf: "center" }}
            title="Update"
            onPress={() => {
              this._updateUser();
            }}
          />
        </View>
      </View>
    );
  }
  _updateUser() {
    const { phone, birthday, email, address, gender } = this.state;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var vnf_regex = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g;
    if (phone == "") {
      showMessages("Thông báo", "Bạn chưa nhập số điện thoại");
    } else if (email == "") {
      showMessages("Thông báo", "Bạn chưa nhập email");
    } else if (!filter.test(email)) {
      showMessages("Thông báo", "Bạn nhập sai email");
    } else if (!vnf_regex.test(phone)) {
      showMessages("Thông báo", "Bạn nhập không đúng dạng số điện thoại");
    }
    {
      this.props.updateUser({
        phone: phone.trim(),
        birthday: birthday,
        sex: gender,
        email: email.trim(),
        address: address.trim()
      });
      this.props.navigation.goBack();
    }
  }
}

const mapStateToProps = state => ({
  UserInfoState: state.userReducer
});

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeUserInfo);
const styles = StyleSheet.create({
  _viewUser: {
    // justifyContent:'space-between',
    marginHorizontal: 20,
    marginBottom: 40,
    marginTop: 10,
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
  _viewBirth: {
    marginTop: 20,
    // marginHorizontal: 25,
    marginLeft: 30,
    marginRight: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor: 'red',
  },
  _viewDate: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 0,
    justifyContent: "flex-end",
    paddingTop: 2,
    borderBottomWidth: 1,
    // borderRadius:4,
    borderColor: "#07c9e7"
  },
  _viewGender: {
    marginHorizontal: 30,
    marginVertical: 40,
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: 'red'
  }
});
