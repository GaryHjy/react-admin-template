import axios from '@/services/http';

const version = '/api/v1';
const basicUrl = `/blog-admin-center${version}`;

/**
 * @description 通过用户名登录
 * @param {Object} params body参数
 */
// eslint-disable-next-line import/prefer-default-export
export const loginByUserName = params => axios.$post(`${basicUrl}/login`, params);

/**
 * @description 通过token获取用户信息
 * @param {String} token token
 */
export const getUserInfoByToken = token => axios.$get(`${basicUrl}/token?token=${token}`);
