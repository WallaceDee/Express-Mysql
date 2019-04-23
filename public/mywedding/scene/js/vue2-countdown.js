
var countdown = {
    template: '<div><div class="countdownbox" v-if="msTime.show"><div class="timepart" :style="setStyle(item)"><h1 :style="setLineHeight(item)">{{ msTime.day }}</h1><p :style="setLineHeight(item)">天</p></div><div class="timepart" :style="setStyle(item)"><h1 :style="setLineHeight(item)">{{ msTime.hour }}</h1><p :style="setLineHeight(item)">时</p></div><div class="timepart" :style="setStyle(item)"><h1 :style="setLineHeight(item)">{{ msTime.minutes }}</h1><p :style="setLineHeight(item)">分</p></div><div class="timepart" :style="setStyle(item)"><h1 :style="setLineHeight(item)">{{ msTime.seconds }}</h1><p :style="setLineHeight(item)">秒</p></div></div><div v-if="!msTime.show" class="countdownwrap"><span class="text" :style="setInStyle(item)" style="display:block;"><span class="num">{{ endText }}</span></span></div></div>',
    replace:true,
    data:function(){
        return {
            endShow: false,
            tipShow: true,
            isEnd: false,
            msTime: {			//倒计时数值
                show: false,		//倒计时状态
                day: 0,			//天
                hour: 0,		//小时
                minutes: 0,		//分钟
                seconds: 0		//秒
            },
            star: '',			//活动开始时间
            end: '',				//活动结束时间
            current: '',         //当前时间
        }
    },
    props:{
        item: {
            type: Object,
            default: null,
        },
        //当前时间
        currentTime: {
            type: Number
        },
        // 活动开始时间
        startTime: {
            type: Number
        },
        // 活动结束时间
        endTime: {
            type: Number
        },
        // 倒计时结束显示文本
        endText: {
            type: String,
            default: '已结束'
        },
        type: {
            type: String
        },
        bili1:{
            type: Number,
            default :1
        },
    },
    mounted:function() {
        var self = this;
        this.startTime.toString().length == 10 ? this.star = this.startTime * 1000 : this.star = this.startTime;
        this.endTime.toString().length == 10 ? this.end = this.endTime * 1000 : this.end = this.endTime;
        if (this.currentTime) {
            this.currentTime.toString().length == 10 ? this.current = this.currentTime * 1000 : this.current = this.currentTime;
        } else {
            this.current = (new Date()).getTime();
        }
        if (this.end < this.current) {
            /**
             * 结束时间小于当前时间 活动已结束
             */
            // this.$set(this, 'endShow', true);
        } else if (this.current < this.star) {
            this.$set(this, 'tipShow', true);
            setTimeout(function () {
                self.runTime(self.star, self.current, self.start_message,false)
            });
        } else if (this.end > this.current && this.star < this.current || this.star == this.current) {
            this.$set(this, 'tipShow', false);
            this.msTime.show = true;
            setInterval(function () {
                self.runTime(self.end, new Date().getTime(), self.end_message, true)
            },1000);
        }
    },
    methods: {
        setLineHeight:function(item) {
            var OutCss = item.in.css;
            var styles = "";
            var flag = false;
            for (var item in OutCss) {
                var value = OutCss[item];
                if (item === "height") {
                    if (this.type == "leftnav") {
                        styles += "lineHeight:" + (value - 40) * this.bili1/2 + "px;";
                    } else {
                        styles += "lineHeight:" + (value - 40) * this.bili1/2 + "px;";
                    }
                } else if (item === "color") {
                    styles += item + ":" + value + ";";
                }
            }
            return styles;
        },
        setStyle:function(item) {
            var OutCss = item.in.css;
            var styles = "";
            var flag = false;
            for (var item in OutCss) {
                var value = OutCss[item];
                if (item === "width") {
                    if (this.type == "leftnav") {
                        styles += item + ":" + (value - 80)/8  + "px;";
                    } else {
                        styles += item + ":" + (value - 80)/8  + "px;";
                    }
                } else if (item === "backgroundColor") {
                    if (item == "") {
                        styles += item + ":" + "rgb(0,0,0)";
                        continue;
                    }
                    styles += item + ":" + value + ";";
                }
            }
            return styles;
        },
        setInStyle:function(item){
            var OutCss = item.in.css;
            var styles = "";
            var flag = false;
            for (var item in OutCss) {
                var value = OutCss[item];
                if (item === "width") {
                    styles += item + ":" + parseInt(value)*this.bili1 + "px;";
                } else if (item === "height") {
                    styles += item + ":" + parseInt(value)*this.bili1 + "px;";
                } else if (item === "top") {
                    styles += item + ":" + parseInt(value)*this.bili1 + "px;";
                } else if (item === "left") {

                    styles += item + ":" + parseInt(value)*this.bili1 + "px;";
                } else if (item === "backgroundColor") {
                    if (item == "") {
                        styles += item + ":" + "rgb(0,0,0)";
                        continue;
                    }
                    styles += item + ":" + value + ";";
                } else if (item === "borderRadius") {
                    value = typeof(value) == "string" ? parseInt(value.replace(/[^0-9]/gi, "")) : value;
                    styles += item + ":" + value + "px;";
                } else if (item == "word-wrap") {
                    flag = true;
                } else if (item == "fontSize") {
                    value = typeof(value) == "string" ? parseInt(value.replace(/[^0-9]/gi, "")) : value;
                    styles += item + ":" + value + "px;";
                } else if (item == "backgroundImage") {
                    continue;
                } else if (item == "backgroundSize") {
                    continue;
                } else if (item == "backgroundPosition") {
                    continue;
                } else if (item == "borderWidth") {
                    continue;
                } else if (item == "borderStyle") {
                    continue;
                } else if (item == "borderColor") {
                    continue;
                } else if (item == "lineHeight") {
                    continue;
                } else {
                    styles += item + ":" + value + ";";
                }
            }
            if (!flag) {
                styles += "word-wrap:" + "break-word";
            }
            return styles;
        },
        runTime:function(startTime, endTime, callFun, type) {
            var msTime = this.msTime;
            var timeDistance = (startTime - endTime);
            if (timeDistance > 0) {
                this.msTime.show = true;
                msTime.day = Math.floor(timeDistance / 86400000);
                timeDistance -= msTime.day * 86400000;
                msTime.hour = Math.floor(timeDistance / 3600000);
                timeDistance -= msTime.hour * 3600000;
                msTime.minutes = Math.floor(timeDistance / 60000);
                timeDistance -= msTime.minutes * 60000;
                //是否开启秒表倒计,未完成
                msTime.seconds = Math.floor(timeDistance / 1000).toFixed(0);
                timeDistance -= msTime.seconds * 1000;
                if (msTime.hour < 10) {
                    msTime.hour = "0" + msTime.hour;
                }
                if (msTime.minutes < 10) {
                    msTime.minutes = "0" + msTime.minutes;
                }
                if (msTime.seconds < 10) {
                    msTime.seconds = "0" + msTime.seconds;
                }
            }
            else {
                callFun();
            }
        },
        start_message:function () {
            var self = this;
            this.$set(this, 'tipShow', false);
            this.$emit('start_callback', this.msTime.show);
            setTimeout(function () {
                self.runTime(self.end,self.star,self.end_message,true)
            },1000);
        },
        end_message:function(){
            this.msTime.show = false;
            this.$emit('end_callback', this.msTime.show);
        }
    }
};

var readme= {
    template: '<p>11111</p>',
};
