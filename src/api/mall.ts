import request from '../utils/axios';

/**
 * 登录
 */
export const algorithmList = (n:string,pageSize:number) => {
  return request({
    url: '/jeecg-system/xht/xhtSuanfa/list?pageSize='+ pageSize +'&category=1&category2='+n,
    method: 'get'
  });
};

export const getCatogory = () => {
  return request({
    url: '/jeecg-system/xht/xhtSuanfa/getCatogory',
    method: 'get'
  });
};

export const addClient = (data) => {
  return request({
    url: '/client/clientInfo/add',
    method: 'post',
    headers:{
      'Content-Type':'application/json'
    },
    data:data
  });
};

