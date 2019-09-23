// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据
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
}