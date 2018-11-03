$._ajax = function(options) {
    var opt = $.extend({
        token: true,
        type: 'post',
        success: function(res) {
            console.log(res)
        },
        error: function(err) {}
    }, options)

    let ajaxOption = {
        dataType: 'json',
        url: opt.url,
        type: opt.type,
        data: opt.data,
        success: function(res) {
            opt.success(res)
        },
        error: function(err) {
            opt.error(err)
            if (err.status === 403) {
                localStorage.removeItem('loginInfo')
            }
        }
    }
    if (opt.token) {
        var access_token = ($.getCache({ key: 'loginInfo' }) || {}).access_token
        ajaxOption.headers = {
            access_token: access_token
        }
    }
    $.ajax(ajaxOption)
}
$.extend($.fn.datagrid.methods, {
    editCell: function(jq, param) {
        return jq.each(function() {
            var opts = $(this).datagrid('options');
            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                if (fields[i] != param.field) {
                    col.editor = null;
                }
            }
            $(this).datagrid('beginEdit', param.index);
            var ed = $(this).datagrid('getEditor', param);
            if (ed) {
                if ($(ed.target).hasClass('textbox-f')) {
                    $(ed.target).textbox('textbox').focus();
                } else {
                    $(ed.target).focus();
                }
            }
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor = col.editor1;
            }
        });
    },
    enableCellEditing: function(jq) {
        return jq.each(function() {
            var dg = $(this);
            var opts = dg.datagrid('options');
            opts.oldOnClickCell = opts.onClickCell;
            opts.onClickCell = function(index, field) {
                if (opts.editIndex != undefined) {
                    if (dg.datagrid('validateRow', opts.editIndex)) {
                        dg.datagrid('endEdit', opts.editIndex);
                        opts.editIndex = undefined;
                    } else {
                        return;
                    }
                }
                dg.datagrid('selectRow', index).datagrid('editCell', {
                    index: index,
                    field: field
                });
                opts.editIndex = index;
                opts.oldOnClickCell.call(this, index, field);
            }
        });
    }
});

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

/**
 * 设置缓存
 * @param key {String} [键名]
 * @param value {Object} [键值]
 * @param es {Number} [保存的时间（s）] //不传长期保存
 * @param isSessionStorage {Boolean} [是否存sessionStorage]
 */
$.setCache = function(option) {
    var defaultOption = {
        key: '',
        value: '',
        es: null,
        isSessionStorage: false
    }
    var opt = $.extend(defaultOption, option)
    // 设置过期原则
    if (!opt.value) {
        if (opt.isSessionStorage) {
            sessionStorage.removeItem(opt.key)
        } else {
            localStorage.removeItem(opt.key)
        }
    } else {
        var e
        if (opt.es === null) {
            e = null
        } else {
            e = opt.es * 1000
        }
        var exp = new Date()
        if (opt.isSessionStorage) {
            sessionStorage.setItem(opt.key, JSON.stringify({ value: opt.value }))
        } else {
            localStorage.setItem(opt.key, JSON.stringify({ value: opt.value, expires: e === null ? e : exp.getTime() + e, createtime: exp.getTime() }))
        }
    }
}

$.getCache = function(option) {
    var defaultOption = {
        isSessionStorage: false,
        key: ''
    }
    var opt = $.extend(defaultOption, option)
    if (localStorage.getItem(opt.key) !== null && !opt.isSessionStorage) {
        var o = JSON.parse(localStorage.getItem(opt.key))
        if ((!o || o.expires < Date.now()) && o.expires !== null) {
            localStorage.removeItem(opt.key)
            return null
        } else {
            return o.value
        }
    } else if (sessionStorage.getItem(opt.key) !== null && opt.isSessionStorage) {
        return JSON.parse(sessionStorage.getItem(opt.key))
    } else {
        return null
    }
}

if( $.getCache({ key: 'loginInfo' })){
    window.access_token = $.getCache({ key: 'loginInfo' }).access_token
}
