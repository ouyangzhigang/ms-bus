import avalon from 'avalon2';
import jQuery from 'jquery';
global.$ = global.jQuery = jQuery;

import { notification } from 'ane';
import { serviceUrl } from './configService';

// 拦截ajax请求，检测是否超时，以重新登录
$(document).ajaxComplete((event, xhr, settings) => {
    if (xhr.status === 200) {
        if (settings.dataType === 'json' && xhr.responseJSON !== void 0) {
            let result = xhr.responseJSON;
            if (result.code === '20' || result.code === '21') {
                if (prompt("Session已经失效，请重新登录")) {
                    global.location.href = "/login.html";
                };
            } else if (result.error) {
                notification.error({
                    message: result.error.message
                });
            }
        }
    } else if (xhr.status === undefined) {
    } else {
        notification.error({
            message: '请求错误，请联系管理员'
        });
    }
});

export default function (options) {
    const defaultOptions = {
        dataType: 'json',
        cache: true,
        jsonp: 'callback'
    };
    options.data = processRequest(options.data);
    options.url = /^\w+:\/\//.test(options.url) ? options.url : serviceUrl + options.url;
    
    if (serviceUrl) {
        defaultOptions.dataType = 'jsonp';
        options.data.jsonp_param_name = 'callback';
    }
    
    return $.ajax({ ...defaultOptions, ...options }).then(processResponse);
};

// 标准化传给后台的参数
function processRequest(r) {
    const str = r || {};
    if (str.start || str.limit) {
        str.page = {
            start: str.start || 0,
            limit: str.limit || 15
        };
        delete str.start;
        delete str.limit;
    }
    return {
        params: JSON.stringify(str)
    };
}

// 标准化后台相应数据格式
function processResponse(r) {
    let str = {};
    if (r.rows) {
        str = r;
        str.code = '0';
        str.list = r.rows;
        delete str.rows;
    } else {
        if (!r.error) {
            str.code = '0';
            str.data = r;
        } else {
            str.code = '1';
            str.message = r.message || r.error;
        }
    }
    return str;
}