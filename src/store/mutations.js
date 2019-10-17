import { setLocalStorage } from './localStorage';

let setCreditScoreGrade = (state, creditScore, grade, gradeStr) => {
  state.grade = grade;
  state.gradeStr = gradeStr;
  state.creditScore = creditScore;
  setLocalStorage({ creditScore: creditScore, grade: grade, gradeStr: gradeStr })
};

const mutations = {
  // 设置TOKEN 方法
  SET_TOKEN_USERID(state, userInfo) {
    state.token = userInfo.token;
    state.userId = userInfo.userId;
    setLocalStorage({ token: userInfo.token, userId: userInfo.userId });
  },
  // 设置分数和对应等级方法
  SET_SCOREDATA_GRADE(state, creditScore) {
    let grade = 4, gradeStr = '一般';
    if (creditScore >= 400 && creditScore < 550) {
      grade = 4;
      gradeStr = '一般';
      setCreditScoreGrade(state, creditScore, grade, gradeStr)
      return
    }
    if (creditScore >= 550 && creditScore < 650) {
      grade = 5;
      gradeStr = '中等';
      setCreditScoreGrade(state, creditScore, grade, gradeStr)
      return
    }
    if (creditScore >= 650 && creditScore < 750) {
      grade = 6;
      gradeStr = '良好';
      setCreditScoreGrade(state, creditScore, grade, gradeStr)
      return
    }
    if (creditScore >= 750 && creditScore < 850) {
      grade = 7;
      gradeStr = '优秀';
      setCreditScoreGrade(state, creditScore, grade, gradeStr)
      return
    }
    if (creditScore >= 850 && creditScore < 950) {
      grade = 8;
      gradeStr = '极好';
      setCreditScoreGrade(state, creditScore, grade, gradeStr)
      return
    }
    if (creditScore >= 950) {
      grade = 9;
      gradeStr = '极好';
      setCreditScoreGrade(state, creditScore, grade, gradeStr)
      return
    }

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

  // 设置芝麻信用信息状态方法
  SET_ZHIMA_INFO_STATUS(state, info) {
    state.zhimaInfoStatus = info;
    setLocalStorage({ zhimaInfoStatus: info });
  },
  // 设置京东信用信息状态方法
  SET_JD_INFO_STATUS(state, info) {
    state.jdInfoStatus = info;
    setLocalStorage({ jdInfoStatus: info });
  }

}
export default mutations