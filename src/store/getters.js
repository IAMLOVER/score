// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据
import { getLocalStorage } from './localStorage'
const store = getLocalStorage();
// 获取USERINFO信息
const userInfo = (state) => {
  return {
    token: state.token || (store.token ? store.token : null),
    userId: state.userId || (store.userId ? store.userId : null),
    idCardInfo: state.idCardInfoStatus || (store.idCardInfoStatus ? store.idCardInfoStatus : 0),
    passPortInfo: state.passPortStatus || (store.passPortStatus ? store.passPortStatus : 0),
    studentsInfo: state.studentInfoStatus || (store.studentInfoStatus ? store.studentInfoStatus : 0),
    eMailInfo: state.eMailStatus || (store.eMailStatus ? store.eMailStatus : 0),
    driveInfo: state.driveStatus || (store.driveStatus ? store.driveStatus : 0),
    carInfo: state.carInfoStatus || (store.carInfoStatus ? store.carInfoStatus : 0),
    houseInfo: state.houseInfoStatus || (store.houseInfoStatus ? store.houseInfoStatus : 0),
    zhimaInfo: state.zhimaInfoStatus || (store.zhimaInfoStatus ? store.zhimaInfoStatus : 0),
    jdInfo: state.jdInfoStatus || (store.jdInfoStatus ? store.jdInfoStatus : 0)
  }
};
// 获取userId和token
const userIdToken = (state) => {
  return {
    token: state.token || (store.token ? store.token : null),
    userId: state.userId || (store.userId ? store.userId : null),
  }
};

// 获取身份证状态
const idCardInfo = (state) => {
  return state.idCardInfoStatus || (store.idCardInfoStatus ? store.idCardInfoStatus : 0)
};
// 获取护照
const passPortInfo = (state) => {
  return state.passPortStatus || (store.passPortStatus ? store.passPortStatus : 0)
};
// 获取学籍信息
const studentsInfo = (state) => {
  return state.studentInfoStatus || (store.studentInfoStatus ? store.studentInfoStatus : 0)
};
// 获取邮箱信息
const eMailInfo = (state) => {
  return state.eMailStatus || (store.eMailStatus ? store.eMailStatus : 0)
};
// 获取驾驶证信息
const driveInfo = (state) => {
  return state.driveStatus || (store.driveStatus ? store.driveStatus : 0)
};
// 获取行驶证信息
const carInfo = (state) => {
  return state.carInfoStatus || (store.carInfoStatus ? store.carInfoStatus : 0)
};
// 获取房产信息
const houseInfo = (state) => {
  return state.houseInfoStatus || (store.houseInfoStatus ? store.houseInfoStatus : 0)
};
// 获取芝麻信用信息
const zhimaInfo = (state) => {
  return state.zhimaInfoStatus || (store.zhimaInfoStatus ? store.zhimaInfoStatus : 0)
};
// 获取京东信用信息
const jdInfo = (state) => {
  return state.jdInfoStatus || (store.jdInfoStatus ? store.jdInfoStatus : 0)
};


// 获取学籍信息中的地区
const studentRegion = (state) => {
  return {
    studentRegionName: state.studentRegionName || (store.studentRegionName ? store.studentRegionName : null), studentRedionId: state.studentRedionId || (store.studentRedionId ? store.studentRedionId : null)
  }
};
// 获取学籍信息对应的选中的学校名字
const studentInfo = (state) => {
  return {
    studentName: state.studentName || (store.studentName ? store.studentName : null),
    studentId: state.studentId || (store.studentId ? store.studentId : null)
  }
};




export default {
  studentRegion,
  studentInfo,
  userInfo,
  userIdToken,
  idCardInfo,
  passPortInfo,
  studentsInfo,
  eMailInfo,
  driveInfo,
  carInfo,
  houseInfo,
  zhimaInfo,
  jdInfo
}