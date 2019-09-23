// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据

// 获取token信息
const userInfo = (state) => {
  return {
    token: state.token,
    userId: state.userId,
    idCardInfo: state.idCardInfoStatus,
    passPortInfo: state.passPortStatus,
    studentsInfo: state.studentInfoStatus,
    eMailInfo: state.eMailStatus,
    driveInfo: state.driveStatus,
    carInfo: state.carInfoStatus,
    houseInfo: state.houseInfoStatus
  }
};

// 获取身份证状态
const idCardInfo = (state) => {
  return state.idCardInfoStatus
};
// 获取护照
const passPortInfo = (state) => {
  return state.passPortStatus
};
const studentsInfo = (state) => {
  return state.studentInfoStatus
};
const eMailInfo = (state) => {
  return state.eMailStatus
};
const driveInfo = (state) => {
  return state.driveStatus
};
const carInfo = (state) => {
  return state.carInfoStatus
};
const houseInfo = (state) => {
  return state.houseInfoStatus
};

// 获取学籍信息中的地区
const studentRegion = (state) => {
  return { studentRegionName: state.studentRegionName, studentRedionId: state.studentRedionId }
};

// 获取学籍信息对应的选中的学校名字
const studentInfo = (state) => {
  return { studentName: state.studentName, studentId: state.studentId }
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