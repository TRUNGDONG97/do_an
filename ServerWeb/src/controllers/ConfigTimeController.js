import ConfigtimeModel from "../models/ConfigtimeModel";
import {converMinuteToTime} from '../util/funtions';
const renderConfigTime = async (req, res, next) => {
  res.render("ConfigTimeView");
};
const getConfigTime = async (req, res, next) => {
  try {
    const configTime = await ConfigtimeModel.findAll();
    if(configTime.leng>0){
      res.send({
        result: 0,
      });
      return
    }
    res.send({
      result:1,
      time_start_work_morning:converMinuteToTime(configTime[0].time_start_work_morning),
      time_start_checkin_morning:converMinuteToTime(configTime[0].time_start_checkin_morning),
      time_end_checkin_morning:converMinuteToTime(configTime[0].time_end_checkin_morning),
      time_start_checkout_morning:converMinuteToTime(configTime[0].time_start_checkout_morning),
      time_end_checkout_morning:converMinuteToTime(configTime[0].time_end_checkout_morning),
      time_start_work_afternoon:converMinuteToTime(configTime[0].time_start_work_afternoon),
      time_start_checkin_afternoon:converMinuteToTime(configTime[0].time_start_checkin_afternoon),
      time_end_checkin_afternoon:converMinuteToTime(configTime[0].time_end_checkin_afternoon),
      time_start_checkout_afternoon:converMinuteToTime(configTime[0].time_start_checkout_afternoon),
      time_end_checkout_afternoon:converMinuteToTime(configTime[0].time_end_checkout_afternoon),
      max_time_late:configTime[0].max_time_late
    })
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};

const updateTimeConfig=async(req,res)=>{
  try {
    var {  max_time_late,
      time_start_work_morning,
      time_start_checkin_morning,
      time_end_checkin_morning,
      time_start_checkout_morning,
      time_end_checkout_morning,
      time_start_work_afternoon,
      time_start_checkin_afternoon,
      time_end_checkin_afternoon,
      time_start_checkout_afternoon,
      time_end_checkout_afternoon,}=req.body
      await ConfigtimeModel.update({
        max_time_late,
        time_start_work_morning,
        time_start_checkin_morning,
        time_end_checkin_morning,
        time_start_checkout_morning,
        time_end_checkout_morning,
        time_start_work_afternoon,
        time_start_checkin_afternoon,
        time_end_checkin_afternoon,
        time_start_checkout_afternoon,
        time_end_checkout_afternoon,
      },{
        where:{
          id:1
        }
      })
      res.send({
        result:1
      })
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
}
export default {
  renderConfigTime,
  getConfigTime,
  updateTimeConfig
};
