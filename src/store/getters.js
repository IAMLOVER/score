// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据
import { getLocalStorage } from './localStorage'
const store = getLocalStorage();
// 获取USERINFO信息
const userInfo = (state) => {
  return {
    token: state.token || (store ? (store.token ? store.token : null) : null),
    userId: state.userId || (store ? (store.userId ? store.userId : null) : null),
    idCardInfo: state.idCardInfoStatus || (store ? (store.idCardInfoStatus ? store.idCardInfoStatus : 0) : 0),
    passPortInfo: state.passPortStatus || (store ? (store.passPortStatus ? store.passPortStatus : 0) : 0),
    studentsInfo: state.studentInfoStatus || (store ? (store.studentInfoStatus ? store.studentInfoStatus : 0) : 0),
    eMailInfo: state.eMailStatus || (store ? (store.eMailStatus ? store.eMailStatus : 0) : 0),
    driveInfo: state.driveStatus || (store ? (store.driveStatus ? store.driveStatus : 0) : 0),
    carInfo: state.carInfoStatus || (store ? (store.carInfoStatus ? store.carInfoStatus : 0) : 0),
    houseInfo: state.houseInfoStatus || (store ? (store.houseInfoStatus ? store.houseInfoStatus : 0) : 0),
    zhimaInfo: state.zhimaInfoStatus || (store ? (store.zhimaInfoStatus ? store.zhimaInfoStatus : 0) : 0),
    jdInfo: state.jdInfoStatus || (store ? (store.jdInfoStatus ? store.jdInfoStatus : 0) : 0)
  }
};
// 获取userId和token
const userIdToken = (state) => {
  return {
    token: state.token || (store ? (store.token ? store.token : null) : null),
    userId: state.userId || (store ? (store.userId ? store.userId : null) : null),
  }
};

// 获取信用分和等级信息
const getCreditScoreGrade = (state) => {
  return {
    creditScore: state.creditScore || (store ? (store.creditScore ? store.creditScore : null) : null),
    grade: state.grade || (store ? (store.grade ? store.grade : null) : null),
    gradeStr: state.gradeStr || (store ? (store.gradeStr ? store.gradeStr : null) : null)
  }
};

// 获取身份证状态
const idCardInfo = (state) => {
  return state.idCardInfoStatus || (store ? (store.idCardInfoStatus ? store.idCardInfoStatus : 0) : 0)
};
// 获取护照
const passPortInfo = (state) => {
  return state.passPortStatus || (store ? (store.passPortStatus ? store.passPortStatus : 0) : 0)
};
// 获取学籍信息
const studentsInfo = (state) => {
  return state.studentInfoStatus || (store ? (store.studentInfoStatus ? store.studentInfoStatus : 0) : 0)
};
// 获取邮箱信息
const eMailInfo = (state) => {
  return state.eMailStatus || (store ? (store.eMailStatus ? store.eMailStatus : 0) : 0)
};
// 获取驾驶证信息
const driveInfo = (state) => {
  return state.driveStatus || (store ? (store.driveStatus ? store.driveStatus : 0) : 0)
};
// 获取行驶证信息
const carInfo = (state) => {
  return state.carInfoStatus || (store ? (store.carInfoStatus ? store.carInfoStatus : 0) : 0)
};
// 获取房产信息
const houseInfo = (state) => {
  return state.houseInfoStatus || (store ? (store.houseInfoStatus ? store.houseInfoStatus : 0) : 0)
};
// 获取芝麻信用信息
const zhimaInfo = (state) => {
  return state.zhimaInfoStatus || (store ? (store.zhimaInfoStatus ? store.zhimaInfoStatus : 0) : 0)
};
// 获取京东信用信息
const jdInfo = (state) => {
  return state.jdInfoStatus || (store ? (store.jdInfoStatus ? store.jdInfoStatus : 0) : 0)
};


// 获取学籍信息中的地区
const studentRegion = (state) => {
  return {
    studentRegionName: state.studentRegionName || (store ? (store.studentRegionName ? store.studentRegionName : null) : null), studentRedionId: state.studentRedionId || (store ? (store.studentRedionId ? store.studentRedionId : null) : null)
  }
};
// 获取学籍信息对应的选中的学校名字
const studentInfo = (state) => {
  return {
    studentName: state.studentName || (store ? (store.studentName ? store.studentName : null) : null),
    studentId: state.studentId || (store ? (store.studentId ? store.studentId : null) : null)
  }
};




export default {
  studentRegion,
  studentInfo,
  userInfo,
  userIdToken,
  getCreditScoreGrade,
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