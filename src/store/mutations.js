const mutations = {
  // 设置学籍信息地区方法,
  SET_STUDENT_RIGION(state, studentRegion) {
    state.studentRegionName = studentRegion.title;
    state.studentRedionId = studentRegion.id
  },
  // 设置学籍信息学校方法
  SET_STUDENT_INFO(state, studentInfo) {
    state.studentName = studentInfo.title;
    state.studentId = studentInfo.id
  }
}
export default mutations