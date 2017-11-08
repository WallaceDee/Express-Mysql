(function($) {
    "use strict";
    $.extend($.fn, {
        validate: function() {
            var is_pass = true;
            this.each(function() {
                if ($(this).attr("required") !== undefined) { //html的pattern要注意转义
                    if ($(this).val() === "") {
                        $.toptip($(this).attr("emptyTips"), 'error');
                        is_pass = false;
                        return false;
                    } else {
                        if ($(this).attr("pattern") !== undefined) { //html的pattern要注意转义
                            var reg = new RegExp($(this).attr("pattern"));
                            if (!reg.test($(this).val())) {
                                $.toptip($(this).attr("notMatchTips"), 'error');
                                is_pass = false;
                                return false;
                            }
                        }
                    }
                }
            });
            return is_pass;
        }
    });
})($);
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

function getCache(name, isSession) {
    var result = null;
    if (isSession === undefined || isSession === false) {
        result = JSON.parse(localStorage.getItem(name));
    } else {
        result = JSON.parse(sessionStorage.getItem(name));
    }
    return result;
}

function setCache(name, object, isSession) {
    if (isSession === undefined || isSession === false) {
        localStorage.setItem(name, JSON.stringify(object));
    } else {
        sessionStorage.setItem(name, JSON.stringify(object));
    }
}
var userInfo = null;
if (getCache("userInfo") !== null) {
    userInfo = getCache("userInfo");
}
var token = null;
if (getCache("token") !== null) {
    token = getCache("token");
    (function(username, token) {
        $.ajax({
            type: "post",
            url: "/users/getUserInfo",
            async: false,
            data: {
                userName: username,
                token: token
            },
            success: function(data) {
                if (data.code === 200) {
                    setCache("userInfo", data.info);
                    console.log("-----------缓存");
                } else {
                    if (window.location.href.indexOf("register.html") === -1) {
                        window.location.href = "register.html";
                    }
                }
            }
        });
    })(userInfo.userName, token);
} else {
    if (window.location.href.indexOf("register.html") === -1) {
        window.location.href = "register.html";
    }
}
//0保密 1男    2女
var gender_list = [{ name: "保密", value: 0 }, { name: "男", value: 1 }, { name: "女", value: 2 }]
template.defaults.imports.genderFormat = function(value) {
    var name = gender_list[0].name;
    for (var i = 0; i < gender_list.length; i++) {
        if (value === gender_list[i].value) {
            name = gender_list[i].name;
        }
    }
    return name;
};