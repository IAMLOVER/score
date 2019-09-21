// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据
// 获取学籍信息中的地区
const studentRegion = (state) => {
  return state.studentRegion
};
export default {
  studentRegion
}