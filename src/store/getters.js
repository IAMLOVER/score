// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据
import { getLocalStorage } from './localStorage'
const store = getLocalStorage();
// 获取token信息
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
    houseInfo: state.houseInfoStatus || (store.houseInfoStatus ? store.houseInfoStatus : 0)
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
const studentsInfo = (state) => {
  return state.studentInfoStatus || (store.studentInfoStatus ? store.studentInfoStatus : 0)
};
const eMailInfo = (state) => {
  return state.eMailStatus || (store.eMailStatus ? store.eMailStatus : 0)
};
const driveInfo = (state) => {
  return state.driveStatus || (store.driveStatus ? store.driveStatus : 0)
};
const carInfo = (state) => {
  return state.carInfoStatus || (store.carInfoStatus ? store.carInfoStatus : 0)
};
const houseInfo = (state) => {
  return state.houseInfoStatus || (store.houseInfoStatus ? store.houseInfoStatus : 0)
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
  idCardInfo,
  passPortInfo,
  studentsInfo,
  eMailInfo,
  driveInfo,
  carInfo,
  houseInfo
}