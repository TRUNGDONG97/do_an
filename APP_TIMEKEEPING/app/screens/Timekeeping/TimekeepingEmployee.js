import { AppHeader, Block } from '@app/components';
import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    StyleSheet
} from 'react-native'
export default  class TimekeepingEmployee extends Component {
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
    
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                     <AppHeader title="List Timekeeping Employee" />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody(){
        return(
            <View><Text>dsdsds</Text></View>
        )
    }
}