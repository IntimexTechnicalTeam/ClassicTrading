const ana = require('./ApiAndAdminServer');
const AppId = 'bf1894a1-32fd-4edd-a7ed-16876e5aa471';
// let AdminServer = 'http://admin.dev.in-store.hk:84'; // DEV
// let AdminServer = 'https://admin.uat.intimex.hk'; // UAT
let AdminServer = ana.AdminServer;
let apiServer = ana.apiServer;
module.exports = {
  // instore app id admin的id
  AppId: AppId, // hongkong taste
  // api server url 統一配置Api服務器的url
  // ApiServer: '/Api', // new uat and production
  // ApiServer: 'http://api.dev.in-store.hk:84', // DEV
  ApiServer: apiServer, // UAT
  // ApiServer: 'https://api.uat.in-store.hk', // Production
  // api version for this app 統一配置Api版本號
  ApiVersion: 'V2',
  // api Authorization 身份认真，用于后端识别客户端
  Authorization: 'YmYxODk0YTEtMzJmZC00ZWRkLWE3ZWQtMTY4NzZlNWFhNDcxOjE4MDNmYjZmLTYzNGQtNGY4ZS1iZDUxLTdlNzI0Mjg5OGRkMg==',
  // admin server url, for login management platform 統一配置admin服務器

  AdminServer: AdminServer,
  // url '/admin' auto open admin tab
  AutoOpenAdmin: true,
  // admin login url 統一配置admin登錄地址
  AdminLoginUrl: AdminServer + '/default/ClientLogin/' + AppId,
  // 前端默认配置
  FrontE: {
    defaultLang: 'C',
    defaultCurrency: 1,
    mobileBuilding: false,
    pcBuilding: false,
    cmsSeoList: ['20297', '20296', '20295', '20298'],
    productSeoList: ['Home'],
    DevEnvironmental: false, // 是否为DEV环境，true:是，false:否
    langList: [{
      name: '繁中',
      value: 'C'
    }, {
      name: 'ENG',
      value: 'E'
    }]
  }
};
