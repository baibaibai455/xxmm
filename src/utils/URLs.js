const base_config = require('./base.config');
let baseURL = base_config.baseURL;                              //测试url


const hostname = location.hostname;


if (hostname == 'uatm.rrl360.com') {
    baseURL = 'https://uat.rrl360.com';                                     //uat的url
} else if (hostname == 'm.rrl360.com') {
    baseURL = 'https://rrl360.com';                                         //线上url
} else if (hostname == 'localhost' || hostname == '192.168.1.66') {
    baseURL = '/proxy';                                                     //本地url
}


export default {

    baseURL: baseURL                                                           //基础URL

};
