import { setLocalStorage } from './localStorage';

const mutations = {
  // 设置TOKEN 方法
  SET_TOKEN_USERID(state, userInfo) {
    state.token = userInfo.token;
    state.userId = userInfo.userId;
    setLocalStorage({ token: userInfo.token, userId: userInfo.userId });
  },
  // 设置身份证状态方法
  SET_IDCARD_STATUS(state, info) {
    state.idCardInfoStatus = info
    setLocalStorage({ idCardInfoStatus: info });
  },

  // 设置护照状态方法
  SET_PASSPORT_STATUS(state, info) {
    state.passPortStatus = info
    setLocalStorage({ passPortStatus: info });
  },
  // 设置学籍状态方法
  SET_STUDENT_INFO_STATUS(state, info) {
    state.studentInfoStatus = info
    setLocalStorage({ studentInfoStatus: info });
  },
  // 设置邮箱状态方法
  SET_EMAIL_STATUS(state, info) {
    state.eMailStatus = info
    setLocalStorage({ eMailStatus: info });
  },
  // 设置驾驶证状态方法
  SET_DRIVE_STATUS(state, info) {
    state.driveStatus = info
    setLocalStorage({ driveStatus: info });
  },
  // 设置行驶证状态方法
  SET_CAR_INFO_STATUS(state, info) {
    state.carInfoStatus = info
    setLocalStorage({ carInfoStatus: info });
  },
  // 设置房产信息状态方法
  SET_HOUSE_INFO_STATUS(state, info) {
    state.houseInfoStatus = info
    setLocalStorage({ houseInfoStatus: info });
  },

  // 设置学籍信息地区方法,
  SET_STUDENT_RIGION(state, studentRegion) {
    state.studentRegionName = studentRegion.title;
    state.studentRedionId = studentRegion.id
    setLocalStorage({ studentRegionName: studentRegion.title, studentRedionId: studentRegion.id });
  },
  // 设置学籍信息学校方法
  SET_STUDENT_INFO(state, studentInfo) {
    state.studentName = studentInfo.title;
    state.studentId = studentInfo.id
    setLocalStorage({ studentName: studentInfo.title, studentId: studentInfo.id });
  },

}
export default mutations