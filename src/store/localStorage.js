
// 获取localstorage
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("store"));
};

// 设置localstorage 
const setLocalStorage = (obj) => {
  // 把传递过来的对象与原来存的对象合并，如果有重复的，就覆盖，没有就存入新的
  let params = JSON.stringify(Object.assign({}, getLocalStorage(), obj));
  localStorage.setItem('store', params);
};



export {
  setLocalStorage,
  getLocalStorage
}