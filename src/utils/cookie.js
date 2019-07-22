/*用export把方法暴露出来*/
/*设置cookie*/


let Base64 = require('js-base64').Base64;

export function setCookie(c_name, value, expire) {

    if (value.nickname != undefined) {
        value.nickname = Base64.encode(value.nickname);
    }

    let date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    document.cookie = c_name + '=' + '';

    if (c_name == 'RRL_SU') {
        document.cookie = c_name + '=' + value + ';expires=' + date.toGMTString();
        document.cookie = c_name + '=' + value + ';path=/; expires=' + date.toGMTString();

    } else {
        document.cookie = c_name + '=' + JSON.stringify(value) + ';expires=' + date.toGMTString();
        document.cookie = c_name + '=' + JSON.stringify(value) + ';path=/;expires=' + date.toGMTString();

    }

}


/*获取cookie*/
export function getCookie(c_name, tt = false) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) c_end = document.cookie.length;
            if (tt) {
                return document.cookie.substring(c_start, c_end);
            }
            return JSON.parse(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

/*删除cookie*/
export function delCookie(c_name) {
    console.log('delCookie');
    setCookie(c_name, '', -1);
}


/*设置sessionStorage*/
export function setSession(s_name, s_value) {
    let set = {
        session: s_value
    };
    sessionStorage.setItem(s_name, JSON.stringify(set));

}


/*获取sessionStorage*/
export function getSession(s_name) {
    if (sessionStorage.getItem(s_name) != null) {
        return JSON.parse(sessionStorage.getItem(s_name)).session;
    }
    return '';
}


/*删除sessionStorage*/
export function delSession(s_name) {
    sessionStorage.removeItem(s_name);
}


/*设置localStorage*/
export function setLocal(s_name, s_value) {
    let set = {
        local: s_value
    };
    localStorage.setItem(s_name, JSON.stringify(set));
}


/*获取localStorage*/
export function getLocal(s_name) {
    if (localStorage.getItem(s_name) != null) {
        return JSON.parse(localStorage.getItem(s_name)).local;
    }
    return '';
}

/*删除sessionStorage*/
export function delLocal(s_name) {
    localStorage.removeItem(s_name);
}















