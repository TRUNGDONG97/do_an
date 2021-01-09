import React, { useState,useImperativeHandle } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "@app/constants/Theme";
import { Checkbox, Icon } from "@component";
import { SCREEN_ROUTER } from "@app/constants/Constant";
const ItemTableEmployee = (props,ref) => {
  const { item, index,checkBoxItem,status,listId } = props;
  //  const [statusState, setStatusState] = useState(status);
  
  const convertMinuteToTime = time => {
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
  return (
    <TouchableOpacity
      style={[
        styles._vColumn,
        {
          backgroundColor:
            index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
        }
      ]}
      onPress={() => {
        props.navigation.navigate(SCREEN_ROUTER.TIMEKEEPING_OF_EMPLOYEE, {
          employee: item.employee
        });
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
          {convertMinuteToTime(item.time_checkin)}
        </Text>
      </View>
      <View style={[styles.rowTable, { flex: 3 }]}>
        <Text style={theme.fonts.regular14}>
          {convertMinuteToTime(item.time_checkout)}
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
        <Checkbox
          size={16}
          status={listId.includes(item.id)}
          onPress={() => {
            // setStatusState(!statusState);
            checkBoxItem(item.id);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.forwardRef(ItemTableEmployee);
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
