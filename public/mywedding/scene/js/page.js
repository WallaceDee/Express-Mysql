var pagelist = {
    template: "<section :class=\"'swiper-slide swiper-slide'+k\" :style=\"showbgstyle(page.pagebg)\"><div :style=\"showtop()\" class=\"itempage\"><div v-for=\"(ev,key) in page.elements\" :index=\"key\" :class=\" k == 0 ? 'item showpage' : 'item nopage'\" :style=\"showoutstyle(ev,key)\"  ><div class=\"amious\" :style=\"showanim(ev.anim)\"><div v-if=\"(ev.type==2 || ev.type==5)\" class=\"el-text\" :style=\"showstyle(ev.in.css)\" v-html=\"showcontent(ev.content)\"></div><img v-if=\"ev.type==4\" class=\"el-bgimg\" :style=\"showimgstyle(ev.in.css)\" :src=\"showimg(ev.src,ev.in.css.width)\" @click=\"picClick(ev.in.properties)\"/><div v-if=\"ev.type=='h'\" :class=\"'svg'+key+'_'+k\" data-flag=\"0\" class=\"el-shape\" :style=\"showstyle(ev.in.css)\" style=\"position:relative\" v-html=\"showshape(ev,key+'_'+k)\"></div><count-down :style=\"showCountstyle(ev.in.css)\" v-if=\"ev.type=='countDown'\" class=\"countDown-text\" :start-time=\"startTime\" :end-text=\"ev.in.properties.endtip\" :end-time=\"parseInt(ev.in.properties.deadlineTime)\" :item=\"ev\" :bili1=\"bili1\"></count-down><div v-if=\"ev.type==='m'\" style=\"width:100%;height:100%;position:relative\"><img style=\"width:100%;height:100%\" :src=\"'https://api.map.baidu.com/staticimage/v2?ak=WtfAdHwd1tMOCf2dzdRIhNZkSq8V7o5W&width=600&height=300&dpiType=ph&markers='+ev.in.properties.address+'|'+ev.in.properties.lng+','+ev.in.properties.lat+'&markerStyles=l,,0xff0000&center='+ev.in.properties.address+'&labels='+ev.in.properties.address+'|'+ev.in.properties.lng+','+ev.in.properties.lat+'&zoom=17&labelStyles=我在这,1,28,0xffffff,0x1abd9b,1'\"/><a style=\"width:80px;height:30px;line-height:30px;background:#1abd9b;position:absolute;right:10px;bottom:10px;color:#fff;text-align:center;border-radius:3px\" @click=\"goLocation(ev.in.properties)\">导 航</a></div><a v-if=\"ev.type=='phoneCallButton'\" :style=\"showastyle(ev.in.css)\" :href=\"'tel://'+ev.in.properties.tel\"><i class=\"iconfont icon-bohao\" :style=\"showButtonStyle(ev.in.css)\"></i><span>{{ev.content}}</span></a><a v-if=\"ev.type=='linkButton'\" :style=\"showastyle(ev.in.css)\" :href=\"showHref(ev.in.properties.url)\"><span>{{ev.content}}</span></a><a :id=\"'zan'+ev.in.properties.id\" v-if=\"ev.type=='interActionButton'\" :style=\"showastyle(ev.in.css)\" :class=\"getzannum(ev.in.properties.id,page)\" data-flag=\"0\" style=\"cursor:pointer\" @click=\"submitZan(ev.in.properties.id,page)\"><i :style=\"showButtonStyle(ev.in.css)\" class=\"iconfont icon-dianzan1\"></i><span>{{ev.content}}</span></a><div v-if=\"ev.type=='r' && ev.is_del != 1\" class=\"shape-element\"><div class=\"wrapper\"><div class=\"shape-render render\"><div v-if=\"ev.type=='r'\" class=\"radiogroup\" style=\"border-radius: 6px;\"><p :style=\"setRadioTitle(ev, key)\">{{ ev.in.properties.str }}</p><div class=\"groupwrap\"><ul style=\"background:#fff\" :style=\"setRadioStyle(ev, key)\" :class=\"'bd'+ev.id\"><li v-for=\"value in ev.in.properties.value\" :key=\"value\"><input type=\"radio\" :name=\"'bd'+ev.id\" :value=\"value\"><span>{{ value }}</span></li></ul></div></div></div></div></div><div  v-if=\"ev.type=='i'\" style=\"position:relative;line-height: 36px;\" class=\"inputs\"><input :class=\"'bd'+ev.id\" :data-flag=\"ev.in.properties.require\" :style=\"showform(ev.in.css)\" style=\"position:absolute\" v-on:focus=\"inputfocus\" v-on:blur=\"inputblur\"><span style=\"position: relative;pointer-events: none; opacity: 0.7;padding-left:20px;\">{{ ev.in.properties.placeholder }}</span><span v-show=\" ev.in.properties.require==true \" style=\"position: relative;pointer-events: none; color:red;\">*</span></div><div v-if=\"ev.type=='s'\" :style=\"showforms(ev.in.css)\" @click=\"submitData(page.elements,page,$event)\"> {{ev.in.properties.str}}</div><div v-if=\"ev.type=='c' && ev.is_del != 1\" class=\"shape-element\"><div class=\"wrapper\"><div class=\"shape-render render\"><div v-if=\"ev.type=='c'\" class=\"radiogroup\" style=\"border-radius: 6px;\"><p :style=\"setRadioTitle(ev,key)\">{{ ev.in.properties.str }}</p><div class=\"groupwrap\"><ul style=\"background:#fff\" :style=\"setRadioStyle(ev,key)\" :class=\"'bd'+ev.id\"><li v-for=\"value in ev.in.properties.value\" :key=\"value\"><input type=\"checkbox\" :name=\"'bd'+ev.id\" :value=\"value\"><span>{{ value }}</span></li></ul></div></div></div></div></div><div v-if=\"ev.type=='p' && ev.is_del != 1\" class=\"shape-element\"><div class=\"wrapper\"><div class=\"shape-render render\" ><div v-if=\"ev.type=='p'\" class=\"selectgroup\"><select :style=\"setRadioStyle(ev,key)\" style=\"padding: 6px 10px;\" :class=\"'bd'+ev.id\"><option value=\"\" :style=\"setOptionStyle(ev,key)\" >{{ ev.in.properties.str }}</option><option v-for=\"value in ev.in.properties.value\" :key=\"value\" :style=\"setOptionStyle(ev,key)\" >{{ value }}</option></select></div></div></div></div></div></div></div></section>",
    replace: true,
    data: function() {
        return {
            startTime: new Date().getTime(),
            top: parseInt((document.documentElement.clientHeight - 1008 * document.documentElement.clientWidth / 640) / 2),
        }

    },
    components: {
        'count-down': countdown,
        'readme': readme

    },
    props: {
        page: {
            type: Object
        },

        current: {
            type: Number,
            default: 0
        },
        k: {
            type: Number,
            default: 0
        },
        bili1: {
            type: Number,
            default: 1
        },
        bili2: {
            type: Number,
            default: 1
        },
        type: {
            type: Number,
            default: 0
        },
        allpage: {
            type: Number,
            default: 0
        },
    },
    mounted: function() {
        var that = this;
        $(window).resize(function() {
            that.top = parseInt((document.documentElement.clientHeight - 1008 * document.documentElement.clientWidth / 640) / 2);
        });
    },
    methods: {
        jubaoForm: function() {
            $(".jubao").show();
            $(".jubaoitem").show();
            $(".jubaoinfo").hide();
            $("#jbval").val(0);
            $(".submitbtn").css("background", "#ebebeb");
        },
        requestUrl: function(params, url, isForm, msg) {
            $.ajax({
                method: 'post',
                url: url,
                data: params,
                success: function(res) {
                    var dd = params;
                    if (res.code == 200) {
                        if (res.status == true) {
                            if (isForm) {
                                $('.inputs').find('input').val('');
                                $('.inputs').find('input').nextAll('span').show();
                                layer.msg(msg);
                            } else {
                                layer.msg(res.msg);
                            }
                        } else {
                            layer.msg(res.msg);
                        }
                    } else {}
                }
            });
        },
        //点赞
        submitZan: function(id, sceneData) {
            var type = this.type;
            $.ajax({
                method: 'post',
                url: 'https://' + window.location.host + '/editor/v1/index/praise',
                data: { oid: sceneData.sceneid, pageid: sceneData.id, zanid: id, type: type },
                async: false,
                success: function(res) {
                    if (res.code == 1) {
                        var data = res.data;
                        layer.open({
                            content: res.msg,
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                                ,
                        });
                        if (data.num > 0) {
                            $("#zan" + id).find('span').text(data.num);
                        }
                    } else {
                        layer.open({
                            content: res.msg,
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                                ,
                        });
                    }
                }
            });

        },
        //获取点赞数
        getzannum: function(id, sceneData) {
            var type = this.type;
            $(document).ready(function() {
                if ($("#zan" + id).attr('data-flag') == 1) {
                    return;
                } else {
                    $.ajax({
                        method: 'post',
                        url: 'https://' + window.location.host + '/editor/v1/index/praisecount',
                        data: { oid: sceneData.sceneid, pageid: sceneData.id, zanid: id, type: type },
                        async: false,
                        success: function(res) {
                            if (res.code == 1) {
                                var data = res.data;
                                if (data.num > 0) {
                                    $("#zan" + id).find('span').text(data.num)
                                    $("#zan" + id).attr('data-flag', 1);
                                }
                            }
                        }
                    });
                }
            });

        },
        submitData: function(item, page, ev) {
            var params = {};
            var formParam = {};
            var values = [];
            params["oid"] = page.sceneid;
            params["pageid"] = page.id;
            var nowobj = $(ev.target).parents('.itempage');
            for (var i = 0; i < item.length; i++) {
                if (item[i].type == "i") {
                    var inputValue = nowobj.find(".bd" + item[i].id).val();
                    inputValue = inputValue.replace(/<[^>]+>/g, "");
                    if (item[i].in.properties.require == 1) { //必填
                        if (
                            inputValue == "" ||
                            inputValue == "undefined" ||
                            inputValue == undefined
                        ) {
                            layer.open({
                                content: '请补全文本信息',
                                skin: 'msg',
                                time: 2,
                            });
                            nowobj.find(".bd" + item[i].id).focus();
                            return;
                        }
                    }
                    var placeholder = item[i].in.properties.placeholder;
                    if (placeholder == "姓名" || placeholder == "姓名:" || placeholder == "姓名：") {
                        if (inputValue.length > 15) {
                            layer.open({
                                content: '姓名过长',
                                skin: 'msg',
                                time: 2,
                            });
                            nowobj.find(".bd" + item[i].id).focus();
                            return;
                        }
                    } else if (placeholder == "手机" || placeholder == "手机:" || placeholder == "手机：") {
                        if (!/^1(3|4|5|7|8)\d{9}$/.test(inputValue)) {
                            layer.open({
                                content: '手机号有误',
                                skin: 'msg',
                                time: 2,
                            });
                            nowobj.find(".bd" + item[i].id).focus();
                            return;
                        }
                    } else if (placeholder == "邮箱" || placeholder == "邮箱:" || placeholder == "邮箱：") {
                        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                        if (!myreg.test(inputValue)) {
                            layer.open({
                                content: '邮箱地址有误',
                                skin: 'msg',
                                time: 2,
                            });
                            nowobj.find(".bd" + item[i].id).focus();
                            return;
                        }
                    } else if (placeholder == "文本" || placeholder == "文本:" || placeholder == "文本：") {
                        if (inputValue.length > 150) {
                            layer.open({
                                content: '文本过长',
                                skin: 'msg',
                                time: 2,
                            });
                            return;
                        }
                    }
                    formParam[item[i].id] = inputValue;
                } else if (item[i].type == "s") {
                    params["ok"] = item[i].in.properties.ok;
                } else if (item[i].type == "r") {
                    var inputValue = nowobj.find("input[name='bd" + item[i].id + "']:checked").val();
                    if (item[i].in.properties.require === "1") {
                        if (inputValue == "" || inputValue == "undefined" || inputValue == undefined) {
                            layer.open({
                                content: '请补全单选信息',
                                skin: 'msg',
                                time: 2,
                            });
                            return;
                        }
                    }
                    formParam[item[i].id] = inputValue;
                } else if (item[i].type == "c") {
                    var check_val = [];
                    nowobj.find("input[name='bd" + item[i].id + "']:checked").each(function(i, n) {
                        check_val[i] = $(this).val();
                    });
                    if (item[i].in.properties.require === "1") {
                        if (check_val.length == 0) {
                            layer.open({
                                content: '请补全多选信息',
                                skin: 'msg',
                                time: 2,
                            });
                            return;
                        }
                    }
                    formParam[item[i].id] = check_val;
                } else if (item[i].type == "p") {
                    var val = nowobj.find(".bd" + item[i].id + " option:selected").val();
                    if (item[i].in.properties.require === "1") {
                        if (val === ("" || "undefined" || undefined)) {
                            layer.open({
                                content: '请补全下拉信息',
                                skin: 'msg',
                                time: 2,
                            });
                            return;
                        }
                    }
                    formParam[item[i].id] = val;
                }
            }
            params["content"] = formParam;
            var param = {
                oid: page.sceneid,
                pageid: page.id,
                formid: page.id,
                content: params["content"],
                type: this.type
            };
            if (!isHttp) {
                $.ajax({
                    method: 'post',
                    url: 'https://' + window.location.host + '/editor/v1/index/submitform',
                    data: param,
                    async: false,
                    beforeSend: function() {
                        isHttp = true;
                    },
                    success: function(res) {
                        isHttp = false;
                        if (res.code == 1) {
                            if (params["ok"] == "" || params["ok"] == "undefined" || params["ok"] == undefined) {
                                var msg = '提交成功';
                            } else {
                                var msg = params["ok"];
                            }
                            $('.inputs').find('input').val('');
                            $('.inputs').find('input').nextAll('span').show();
                        } else {
                            var msg = res.msg;
                        }
                        layer.open({
                            content: msg,
                            skin: 'msg',
                            time: 2,
                        });
                    },
                    error: function() {
                        isHttp = false;
                    }
                });
            }


        },
        inputfocus: function(ev) {
            $(ev.target)
                .nextAll("span")
                .hide();
        },
        inputblur: function(ev) {
            if ($(ev.target).val() == "") {
                $(ev.target)
                    .nextAll("span")
                    .show();
            } else {
                $(ev.target)
                    .nextAll("span")
                    .hide();
            }
        },
        setRadioTitle: function(item1, itemType) {
            var OutCss = item1.in.css;
            if (itemType == 3) {
                return;
            }
            var styles = "";
            var flag = false;
            for (var item in OutCss) {
                var value = OutCss[item];
                if (item === "background") {
                    styles += item + ":" + value + ";";
                } else if (item == "backgroundColor") {
                    styles += item + ":" + value + ";";
                } else if (item == "fontSize") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item == "lineHeight") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item == "fontFamily") {
                    styles += item + ":" + value + ";";
                } else if (item == "color") {
                    styles += item + ":" + value + ";";
                } else {
                    continue;
                }
            }
            return styles;
        },
        setRadioStyle: function(item1, itemType) {
            var OutCss = item1.in.css;
            if (itemType == 3) {
                return;
            }
            var styles = "";
            var flag = false;
            for (var item in OutCss) {
                var value = OutCss[item];
                if (item === "width") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                    continue;
                } else if (item === "height") {
                    continue;
                } else if (item === "top") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item === "left") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item === "background") {
                    if (item1.type != ("p" && "g")) {
                        styles += "borderColor:" + value + ";";
                    } else {
                        styles += item + ":" + value + ";";
                    }
                } else if (item === "backgroundColor") {
                    if (item1.type != ("p" && "g")) {
                        styles += "borderColor:" + value + ";";
                    } else {
                        styles += item + ":" + value + ";";
                    }
                } else if (item === "borderRadius") {
                    continue;
                } else if (item === "borderColor") {
                    if (item1.type == ("p" && "g")) {
                        styles += item + ":" + value + ";";
                    } else {
                        continue;
                    }
                } else if (item == "fontSize") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item == "borderWidth") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item == "lineHeight") {
                    styles += item + ":" + parseInt(value) * this.bili1 + "px;";
                } else if (item.indexOf("padding") == 0) {
                    continue;
                } else {
                    styles += item + ":" + value + ";";
                }
            }
            return styles;
        },
        setOptionStyle: function(item1, itemType) {
            var OutCss = item1.in.css;
            if (itemType == 3) {
                return;
            }
            var styles = "";
            var flag = false;
            for (var item in OutCss) {
                var value = OutCss[item];
                if (item == "fontSize") {
                    value =
                        typeof value == "string" ?
                        parseInt(value.replace(/[^0-9]/gi, "")) :
                        value;
                    styles += item + ":" + value * 0.5 + "px;";
                }
            }
            return styles;
        },


        //图片点击事件
        picClick: function(data) {
            if (data.hasUrl == 1) {
                if (data.jumpUrl.indexOf("http://") > -1 || data.jumpUrl.indexOf("https://") > -1) {
                    var url = data.jumpUrl;
                } else {
                    var url = "http://" + data.jumpUrl.replace("http://", "");
                }
                window.location.href = url;
            } else if (data.hasUrl == 2) {
                var scrollIndex = loop == 1 ? data.jumpPageNumber : data.jumpPageNumber - 1;
                // this.pageStr = data.jumpPageNumber + "/" + this.pagesData.length;
                mySwiper.slideTo(scrollIndex, 1000, true);
            }
        },
        setBgStyle: function(PageBg) {
            if (typeof(PageBg) == "undefined") {
                return
            }
            if (typeof(PageBg.backgroundImage) == "undefined") {
                return
            }

            if (PageBg.backgroundImage.length && PageBg.backgroundColor) {

                var style = "background: " + PageBg.backgroundColor + " url(" + PageBg.backgroundImage + ") no-repeat top left / cover;";
                //console.log(style);
                return style
            } else if (PageBg.backgroundImage.length) {
                var style = "background: url(" + PageBg.backgroundImage + ") no-repeat top left / cover;";
                return style
            } else if (PageBg.backgroundColor) {
                return "background: " + PageBg.backgroundColor;
            }

        },
        showimg: function(src, width) {
            var image = /.(gif)$/;
            var isgif = 0;
            if (image.test(src)) {
                isgif = 1;
            }
            if (width == '100%' || typeof width === 'undefined') {
                ext = 7
            } else {
                var ext = Math.ceil(width / 100);
                if (ext > 9) {
                    ext = 9
                }
            }
            if (src.indexOf("http://") != -1) {
                src = src.replace('http://', 'https://');
            }
            if (isgif == 1) {
                if (ext > 6) {
                    return src + '?x-oss-process=image/resize,w_' + ext + '00';
                } else {
                    return src;
                }
            } else {
                return src + '?x-oss-process=image/resize,w_' + ext + '00';
            }
        },

        showcontent: function(str) {


            if (typeof str == 'undefined') {
                return "";
            }
            str = str.replace(/amp;/g, '');

            str = str.replace(/&lt;/g, '<');
            str = str.replace(/&gt;/g, '>');
            str = str.replace(/&quot;/g, "''");
            str = str.replace(/&#039;/g, "'");
            //str = str.replace(/&nbsp;/g, " ");
            str = str.replace(/\n/g, "<br>");

            return str;
        },

        inputfocus: function(ev) {

            $(ev.target).nextAll('span').hide()

        },
        showHref: function(data) {

            if (data.indexOf("http://") > -1 || data.indexOf("https://") > -1) {
                var url = data;
            } else {
                var url = "http://" + data.replace("http://", "");
            }
            return "javascript:window.location.href='" + url + "'";
        },

        //导航
        goLocation: function(data) {
            var lng, lat;
            var _self = this;
            var geolocation = new BMap.Geolocation();
            // 创建地理编码实例
            var myGeo = new BMap.Geocoder();
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    // 根据坐标得到地址描述
                    myGeo.getLocation(r.point, function(result) {
                        if (result) {
                            var mk = new BMap.Marker(r.point);
                            _self.lng = r.point.lng;
                            _self.lat = r.point.lat;
                            var params = {};
                            params.start = {
                                address: result.surroundingPois[0].address,
                                msg: result.addressComponents,
                                lat: r.point.lat,
                                lng: r.point.lng
                            };
                            params.end = {
                                address: data.address,
                                lat: data.lat,
                                lng: data.lng,
                            };
                            _self.navication(params);

                        }
                    });
                } else {
                    alert('failed' + this.getStatus());
                }
            }, { enableHighAccuracy: true })
        },
        navication: function(data) {
            location.href = "https://api.map.baidu.com/direction?origin=latlng:" + data.start.lat + "," + data.start.lng + "|name:" + data.start.address + "&destination=" + data.end.address + "&mode=driving&region=" + data.start.msg.province + "&output=html&src=yourCompanyName|yourAppName";
        },
        inputblur: function(ev) {

            if ($(ev.target).val() == "") {

                $(ev.target).nextAll('span').show()
            } else {

                $(ev.target).nextAll('span').hide()
            }
        },
        setSpanStyle: function(inCssObj) {

            var styles = "";

            for (var item in inCssObj) {

                var value = inCssObj[item];
                if (item === "height") {
                    styles += item + ":" + value + "px" + ";";
                } else if (item === "lineHeight" || item === "fontSize") {
                    styles += item + ":" + parseInt(value) * this.bili2 + "px;";
                }
            }

            // console.log(styles+"ss")
            return styles;
        },
        showButtonStyle: function(inCss) {
            var styles = "";
            for (var item in inCss) {
                var value = inCss[item];
                if (item === "fontSize") {
                    value =
                        typeof value == "string" ?
                        parseInt(value.replace(/[^0-9]/gi, "")) :
                        value;
                    styles += item + ":" + value * this.bili1 + "px;";
                }
            }
            return styles;
        },

        showimgstyle: function(css) {
            var cssobj = "display:block;";

            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'width')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && (o === 'left')) {

                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';


                } else if (o === 'fontSize' || o === 'borderWidth' || o === 'borderRadius') {

                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';
                } else if (!isNaN(css[o]) && (o === 'height')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';
                } else if ((o === 'letterSpacing')) {
                    cssobj += o + ':' + (parseInt(css[o]) * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && (o === 'top')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'padding') {
                    //cssobj+=o+':'+(css[o]*this.bili2)+'px;';

                } else if (o === 'backgroundImage' || o === 'backgroundPosition' || o === 'backgroundRepeat' || o === 'backgroundSize') {
                    continue
                } else {
                    cssobj += o + ':' + css[o] + ";";
                }

            }

            return cssobj;
        },
        showCountstyle: function(css) {
            var cssobj = "";
            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'width' || o === 'left')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'fontSize' || o === 'borderWidth' || o === 'borderRadius') {

                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';


                } else if (!isNaN(css[o]) && (o === 'height')) {
                    if (css[o] == 1) {
                        cssobj += o + ':' + (150 * this.bili1) + 'px;line-height:' + (150 * this.bili1) + 'px;';
                    } else {
                        cssobj += o + ':' + (css[o] * this.bili1) + 'px;line-height:' + (css[o] * this.bili1) + 'px;';
                    }
                } else if (!isNaN(css[o]) && (o === 'top')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'padding') {
                    //cssobj+=o+':'+(css[o]*this.bili2)+'px;';

                } else if (o === 'background-color' || o === 'backgroundColor') {
                    continue
                } else if (o === 'line-height' || o === 'lineHeight') {
                    continue
                } else {

                    cssobj += o + ':' + css[o] + ";";
                }

            }

            return cssobj;
        },
        showstyle: function(css) {
            var cssobj = "";

            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'width' || o === 'left')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'fontSize' || o === 'borderWidth' || o === 'borderRadius') {

                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';


                } else if (!isNaN(css[o]) && (o === 'height')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && (o === 'top')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'paddingBottom' || o === 'paddingTop') {
                    cssobj += o + ":" + parseFloat(css[o]) + "em;";
                } else if (o === 'paddingLeft' || o === 'paddingRight') {
                    cssobj += o + ":" + parseFloat(css[o]) * this.bili1 + "px;";
                } else if (o === "letterSpacing") {
                    cssobj += o + ":" + parseFloat(css[o]) * this.bili1 + "px;";
                } else {
                    cssobj += o + ':' + css[o] + ";";
                }
            }
            return cssobj;
        },
        showastyle: function(css) {
            var cssobj = "display:block;text-align: center;";
            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'width' || o === 'left')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'fontSize' || o === 'borderWidth') {

                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';


                } else if (o === 'borderRadius') {

                    cssobj += o + ':' + parseInt(css[o]) / 2 * this.bili1 + 'px;';


                } else if (!isNaN(css[o]) && (o === 'height')) {

                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';
                    cssobj += 'lineHeight:' + (css[o] * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && (o === 'top')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'lineHeight') {
                    //cssobj+=o+':'+(css[o]*this.bili2)+'px;';

                } else {

                    cssobj += o + ':' + css[o] + ";";
                }

            }
            return cssobj;
        },
        showtop: function() {
            var style = "";
            style += "position: relative;top:" + this.top + "px;";
            return style;
        },
        showbgstyle: function(ev) {
            var style = "";
            if (typeof ev.backgroundColor !== "undefined" && ev.backgroundColor !== '') {
                style += "backgroundColor:" + ev.backgroundColor + ";";
            }
            if (typeof ev.backgroundImage !== "undefined" && ev.backgroundImage !== '') {
                var url = ev.backgroundImage;
                if (url.indexOf("http://") != -1) {
                    url = url.replace('http://', 'https://');
                }
                style += "backgroundImage:url(" + url + ");backgroundSize:100% 100%;";
            }
            return style;
        },
        showoutstyle: function(ev) {
            var cssobj = "";
            var css = ev.out.css;
            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'width' || o === 'left')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'fontSize' || o === 'borderRadius') {

                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';
                } else if (o === 'borderWidth') {
                    continue;
                } else if (!isNaN(css[o]) && (o === 'height')) {
                    if (css[o] == 1 && ev.type == '2') {
                        cssobj += o + ':' + (150 * this.bili1) + 'px;';
                    } else {
                        cssobj += o + ':' + (css[o] * this.bili1) + 'px;';
                    }


                } else if (!isNaN(css[o]) && (o === 'top')) {

                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'lineHeight' && css[o] <= 2) {
                    //cssobj+=o+':'+(css[o]*this.bili2)+'px;';

                } else if (o === 'paddingBottom' || o === 'paddingTop') {
                    cssobj += o + ":" + parseFloat(css[o]) * this.bili1 + "px;";
                } else if (o === 'paddingLeft' || o === 'paddingRight') {
                    cssobj += o + ":" + parseFloat(css[o]) * this.bili1 + "px;";
                } else {
                    cssobj += o + ':' + css[o] + ";";
                }


            }
            //console.log(cssobj);
            return cssobj;
        },
        showform: function(css) {
            var cssobj = "";
            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'left')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && (o === 'width')) {
                    cssobj += o + ': 100%;';

                } else if (o === 'fontSize' || o === 'borderWidth') {

                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';


                } else if (!isNaN(css[o]) && (o === 'height' || o === 'top')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (o === 'padding') {
                    cssobj += o + ':0 ' + parseInt(css[o]) * this.bili1 + 'px;';

                } else if (o === 'lineHeight' && isNaN(css[o])) {
                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';

                } else {
                    cssobj += o + ':' + css[o] + ";";
                }

            }

            return cssobj;
        },
        showforms: function(css) {
            var cssobj = "";
            for (var o in css) {

                if (!isNaN(css[o]) && (o === 'left')) {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && (o === 'width')) {
                    cssobj += o + ': 100%;';

                } else if (o === 'fontSize' || o === 'borderWidth') {
                    cssobj += o + ':' + parseInt(css[o]) * this.bili1 + 'px;';

                } else if (!isNaN(css[o]) && o === 'height') {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';
                    cssobj += 'line-height:' + (css[o] * this.bili1) + 'px;';

                } else if (!isNaN(css[o]) && o === 'top') {
                    cssobj += o + ':' + (css[o] * this.bili1) + 'px;';
                } else if (o === 'padding') {
                    cssobj += o + ':0 ' + parseInt(css[o]) * this.bili1 + 'px;';
                } else if (o === 'lineHeight' && isNaN(css[o])) {
                    continue;
                } else {
                    cssobj += o + ':' + css[o] + ";";
                }

            }

            return cssobj;
        },
        showanim: function(anim) {
            if (anim.length == 0) {
                return;
            }
            var animate = "width:100%;height:100%;animation:";
            for (var i in anim) {

                animate += anim[i].type + ' ';
                animate += anim[i].duration + 's ';
                animate += ' ';
                animate += anim[i].delay + 's ';
                if (anim[i].count == -1) {
                    animate += 'infinite ';
                } else {
                    animate += anim[i].count + ' ';
                }
                if (anim.length - 1 == i) {
                    if (i == 0) {
                        animate += 'ease both; ';
                    } else {
                        animate += 'normal;';
                    }
                } else {
                    if (i == 0) {
                        animate += 'ease both, ';
                    } else {
                        animate += 'normal, ';
                    }

                }


            }


            return animate;
        },
        showshape: function(item, id) {
            if (typeof item.vesion == "undefined" || item.vesion == 0) {
                var vesion = 0;
            } else {
                var vesion = 1;
            }
            $(document).ready(function() {
                if (typeof item.src == "undefined" || item.src == null || item.src == "") {
                    return;
                }
                if ($('.svg' + id).attr('data-flag') == 1) {

                    return;
                } else {
                    var c, d;
                    var c = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                    var svgurl = item.src.replace("http://", "https://")
                    $.ajax({
                        // url:'https://'+window.location.host+'/editor/v1/index/getshape',
                        // type:'post',
                        // data: {url: b.src},
                        url: svgurl,
                        type: 'get',
                        dataType: 'xml',
                        success: function(res) {
                            var svg = res.getElementsByTagName("svg");
                            svg = svg[0];
                            if (vesion == 1) {

                            } else {
                                var colors = item.in.properties.colors;
                                if (typeof colors !== "undefined") {
                                    var colorarr = Object.values(colors);
                                } else {
                                    var colorarr = [];
                                }
                                if (colorarr.length > 0) {
                                    var i = 0;
                                    $(svg).find("[fill], [style*='fill']").each(function(i) {
                                        if (colorarr[i] == undefined) {
                                            $(this).attr("fill", colorarr[i - 1]);
                                        } else {
                                            $(this).attr("fill", colorarr[i]);
                                        }
                                    });
                                }
                                $(svg).attr({
                                    width: '100%',
                                    height: '100%',
                                    preserveAspectRatio: "none meet",
                                    style: "position: absolute",
                                });
                                $(".svg" + id).append(svg);
                                $('.svg' + id).attr('data-flag', 1);
                            }
                        }

                    });

                }
            });
        },
        setShapeHtml: function(item) {
            if (item.svgdom == "") {
                return "";
            }
            var svg = $(item.svgdom);
            var colors = item.in.properties.colors;
            if (typeof colors !== "undefined") {
                var colorarr = Object.values(colors);
            } else {
                var colorarr = [];
            }
            if (colorarr.length > 0) {
                var i = 0;
                svg.find("[fill], [style*='fill']").each(function(i) {
                    if (colorarr[i] == undefined) {
                        $(this).attr("fill", colorarr[i - 1]);
                    } else {
                        $(this).attr("fill", colorarr[i]);
                    }
                });
                $(svg).attr({
                    width: '100%',
                    height: '100%',
                    preserveAspectRatio: "none meet"
                });
            } else {
                $(svg).attr({
                    width: '100%',
                    height: '100%',
                    preserveAspectRatio: "none meet"
                });
                return $(svg[svg.length - 1]).prop("outerHTML");
            }
            return $(svg[svg.length - 1]).prop("outerHTML");
        },


    }
};