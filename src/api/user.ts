import request from '../utils/axios';

/**
 * 登录
 */
export const login = (username:string, password:string) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
};


/**
 * 登录
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/user/getUserInfo',
    method: 'get'
  });
};

// export function getUserInfo() {
//   return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, {}).catch((e) => {
//     // update-begin--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
//     if (e && (e.message.includes('timeout') || e.message.includes('401'))) {
//       //接口不通时跳转到登录界面
//       const userStore = useUserStoreWithOut();
//       userStore.setToken('');
//       setAuthCache(TOKEN_KEY, null);
//       router.push(PageEnum.BASE_LOGIN);
//     }
//     // update-end--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
//   });
// }