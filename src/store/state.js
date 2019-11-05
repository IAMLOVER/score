const state = {
    token: '', //登录时记录的token
    userId: '', //登录时记录的userId
    mark: '', // 登录渠道mark
    creditScore: '', //信用分
    grade: '', //信用分对应等级
    gradeStr: '', //信用分对应等级描述
    studentRegionName: '', // 学籍选择的地区信息
    studentRedionId: '', // 学籍选择地区id
    studentName: '', //学籍地区对应的选中学校名字
    studentId: '', //学籍地区对应的选中学校的id
    idCardInfoStatus: '', //身份证信息状态，0是未完成，1是完成
    passPortStatus: '', //护照状态
    studentInfoStatus: '', //学籍状态
    eMailStatus: '', //邮箱状态
    driveStatus: '', //驾驶证状态
    carInfoStatus: '', //行驶证状态
    houseInfoStatus: '', //房产信息状态
    zhimaInfoStatus: '', //芝麻信息状态
    jdInfoStatus: '' //京东信息状态
}

export default state